import { Routes } from '@angular/router';
import { ApiGeneratorComponent } from './features/api-generator/api-generator.component';
import { NgxsModule } from '@ngxs/store';
import { ApiGeneratorState } from './features/api-generator/store/api-generator.state';
import { importProvidersFrom } from '@angular/core';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ApiGeneratorComponent,
    providers: [importProvidersFrom(NgxsModule.forFeature([ApiGeneratorState]))]
  }
];
