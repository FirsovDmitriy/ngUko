import { TuiBlock, TuiRadio } from "@taiga-ui/kit";
import { TuiGroup } from "@taiga-ui/core";
import { Component, inject, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'
import { ErrorTextComponent } from '../../../../ui-kit/error-text/error-text.component'

@Component({
  selector: 'uko-select-message-type',
  imports: [
    ReactiveFormsModule,
    TuiGroup,
    TuiBlock, TuiRadio,
    ErrorTextComponent,
  ],
  templateUrl: './select-message-type.component.html',
})
export class SelectMessageTypeComponent implements OnInit {
  private formManager = inject(MultiStepFormManager)
  protected messageType!: FormControl

  protected controlValue = new FormControl('', Validators.required)

  constructor() {}

  ngOnInit(): void {
    const control = this.formManager.getForm('messageType')

    if (control) {
      this.messageType = control as FormControl
    }
  }
}
