import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variables } from '@app/variables';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import * as SurveyTheme from 'survey-core/themes';

export interface PageChangedEvent {
  currentPageNumber: number;
  pageCount: number;
}
@Component({
  selector: 'app-capturing-form',
  templateUrl: './capturing-form.component.html',
  standalone: true,
  imports: [CommonModule, SurveyModule],
  styles: [
    `
      :host {
        ::ng-deep {
          .sd-body {
            @apply xl:w-6/12 #{!important};
          }
        }
      }
    `
  ]
})
export class CapturingFormComponent implements OnInit {
  @Input() surveyJson: Variables;
  @Output() currentPageChanged = new EventEmitter<PageChangedEvent>();
  @Output() captureCompleted = new EventEmitter<Variables>();
  @Output() valueChanged = new EventEmitter<Variables>();

  private model: Model;
  private currentExternalContext: Variables;

  @Input() set externalContext(variables: Variables) {
    if (!variables) {
      return;
    }

    this.currentExternalContext = variables;

    if (!this.model) {
      return;
    }
    this.model.getQuestionByName('includedTables')['choices'] = variables['choices'];
  }

  ngOnInit(): void {
    this.startCapture(this.surveyJson);
  }

  get surveyModel(): Model {
    return this.model;
  }

  private startCapture(surveyJson: Variables) {
    this.model = new Model(surveyJson);

    this.model.applyTheme(SurveyTheme.DefaultLightPanelless);

    if (this.currentExternalContext) {
      Object.entries(this.currentExternalContext).forEach(([key, value]) => this.model.setVariable(key, value));
    }

    this.model.onCurrentPageChanged.add(() => {
      this.currentPageChanged.emit({ currentPageNumber: this.model.currentPageNo, pageCount: this.model.pageCount });
    });

    this.model.onValueChanged.add(() => {
      this.valueChanged.emit(this.model.data as Variables);
    });

    this.model.onComplete.add(() => {
      this.captureCompleted.emit(this.model.data as Variables);
      this.model.clear(false, true);
    });
  }
}
