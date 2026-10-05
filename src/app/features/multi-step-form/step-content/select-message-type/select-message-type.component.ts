import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiRadioModule } from '@taiga-ui/kit';
import { MultiStepFormManager } from '../../_state/multi-step-form.manager';
import { TuiLabelModule } from '@taiga-ui/core';

@Component({
  selector: 'uko-select-message-type',
  standalone: true,
  imports: [TuiRadioModule, ReactiveFormsModule, TuiLabelModule],
  templateUrl: './select-message-type.component.html'
})
export class SelectMessageTypeComponent implements OnInit {
  private formManager = inject(MultiStepFormManager)
  protected readonly messageType = new FormControl('', Validators.required)

  constructor() {}

  ngOnInit(): void {
    this.formManager.upsert('messageType', this.messageType)
  }
}
