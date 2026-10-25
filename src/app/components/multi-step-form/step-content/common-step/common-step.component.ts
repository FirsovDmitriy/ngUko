import { Component, inject, OnInit } from '@angular/core';
import { MultiStepFormManager } from '../../_state/multi-step-form.manager';
import { steps } from '../../constants';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'uko-common-step',
  imports: [ReactiveFormsModule],
  templateUrl: './common-step.component.html'
})
export class CommonStepComponent implements OnInit {
  private readonly formManager = inject(MultiStepFormManager)

  protected control = this.formManager.getForm(steps.COMMON_SETTINGS)

  ngOnInit(): void {}
}
