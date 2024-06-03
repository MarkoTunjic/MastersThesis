import { Injectable, NgZone, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GenerateApi, GetAvailableTables, ShowErrorMessage, UpdateCaptureData } from './api-generator.actions';
import { CrudGeneratorControllerService, DatabaseConnectionData, GenerationRequestDto } from '@api';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Variables } from '@app/variables';
import { ToastrService } from 'ngx-toastr';

interface ApiGeneratorStateModel {
  availableTables: string[];
  captureData: Variables;
  isLoading: boolean;
}

const defaults: ApiGeneratorStateModel = {
  availableTables: [],
  captureData: undefined,
  isLoading: false
};

@State<ApiGeneratorStateModel>({
  name: 'apiGenerator',
  defaults
})
@Injectable()
export class ApiGeneratorState {
  private readonly crudGeneratorService = inject(CrudGeneratorControllerService);
  private readonly toastrService = inject(ToastrService);
  private readonly zone = inject(NgZone);

  @Selector()
  static getCaptureExternalContext(state: ApiGeneratorStateModel): Variables {
    const choices = state.availableTables.map((availableTable) => ({
      value: availableTable,
      text: availableTable
    }));
    return { choices } as Variables;
  }

  @Selector()
  static getIsLoading(state: ApiGeneratorStateModel) {
    return state.isLoading;
  }

  @Action(GetAvailableTables, { cancelUncompleted: true })
  getAvailableTables(ctx: StateContext<ApiGeneratorStateModel>): Observable<unknown> {
    const { captureData } = ctx.getState();
    return this.crudGeneratorService.getAvailableTables(captureData as DatabaseConnectionData).pipe(
      tap((availableTablesDto) => ctx.patchState({ availableTables: availableTablesDto.availableTables })),
      catchError((err) => {
        ctx.dispatch(new ShowErrorMessage('Error while fetching available tables. Check credentials and try again!'));
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(UpdateCaptureData, { cancelUncompleted: true })
  updateCaptureData(ctx: StateContext<ApiGeneratorStateModel>, action: UpdateCaptureData) {
    ctx.patchState({ captureData: action.captureData });
  }

  @Action(GenerateApi)
  generateApi(ctx: StateContext<ApiGeneratorStateModel>): Observable<unknown> {
    const { captureData } = ctx.getState();
    const generationRequestDto: GenerationRequestDto = {
      architectures: captureData['architectures'] as string[],
      cascade: captureData['cascade'] as boolean,
      includedTables: captureData['includedTables'] as string[],
      projectName: captureData['projectName'] as string,
      solutionName: captureData['solutionName'] as string
    };
    const databaseConnectionData: DatabaseConnectionData = {
      databaseName: captureData['databaseName'] as string,
      databasePort: captureData['databasePort'] as string,
      databasePwd: captureData['databasePwd'] as string,
      databaseServer: captureData['databaseServer'] as string,
      databaseUid: captureData['databaseUid'] as string,
      provider: captureData['provider'] as string
    };
    ctx.patchState({ isLoading: true });
    return this.crudGeneratorService.generateProject(generationRequestDto, databaseConnectionData).pipe(
      tap((response) => {
        this.downloadFile(response, generationRequestDto.solutionName);
        ctx.patchState({ isLoading: false });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        ctx.dispatch(new ShowErrorMessage('Error while creating zip please try again!'));
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(ShowErrorMessage, { cancelUncompleted: true })
  showErrorMessage(ctx: StateContext<ApiGeneratorStateModel>, action: ShowErrorMessage): void {
    this.zone.run(() => {
      this.toastrService.error(action.message, undefined, {
        timeOut: 3000
      });
    });
  }

  private downloadFile(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'application/zip' });
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.download = fileName + '.zip';
    anchor.href = url;
    anchor.click();
  }
}
