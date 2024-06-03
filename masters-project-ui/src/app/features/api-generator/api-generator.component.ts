import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GENERATOR_SURVEY_CONFIG } from '@app/constants/survey-config/generator-survey';
import { CapturingFormComponent, PageChangedEvent } from '@app/features/capturing-form/capturing-form.component';
import { Variables } from '@app/variables';
import { Select, Store } from '@ngxs/store';
import { GenerateApi, GetAvailableTables, UpdateCaptureData } from './store/api-generator.actions';
import { ApiGeneratorState } from './store/api-generator.state';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-api-generator',
  templateUrl: './api-generator.component.html',
  standalone: true,
  imports: [CommonModule, CapturingFormComponent, AsyncPipe, MatProgressSpinnerModule]
})
export class ApiGeneratorComponent {
  @Select(ApiGeneratorState.getCaptureExternalContext)
  captureExternalContext$: Observable<Variables>;

  @Select(ApiGeneratorState.getIsLoading)
  isLoading$: Observable<boolean>;

  private readonly store = inject(Store);

  get surveyModel() {
    return GENERATOR_SURVEY_CONFIG;
  }

  onCaptureValueChanged(captureData: Variables) {
    this.store.dispatch(new UpdateCaptureData(captureData));
  }

  onCaptureComplete() {
    this.store.dispatch(new GenerateApi());
  }

  onCapturePageChange(pageData: PageChangedEvent) {
    if (pageData.currentPageNumber !== 1) {
      return;
    }
    this.store.dispatch(new GetAvailableTables());
  }
}
