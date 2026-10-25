import { Component, inject, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TuiRadioBlockModule } from '@taiga-ui/kit'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'
import { TuiGroupModule } from '@taiga-ui/core'
import { ErrorTextComponent } from '../../../../ui-kit/error-text/error-text.component'

@Component({
  selector: 'uko-select-message-type',
  imports: [
    ReactiveFormsModule,
    TuiGroupModule,
    TuiRadioBlockModule,
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
