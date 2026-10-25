import { Component, inject } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  WebPushActionControls,
  WebPushFormControls,
} from '../../services/editor-form.service'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'

@Component({
  selector: 'uko-web-push',
  imports: [ReactiveFormsModule],
  templateUrl: './web-push.template.html',
})
export class WebPushComponent {
  private readonly fb = inject(FormBuilder)
  private readonly formManager = inject(MultiStepFormManager)

  protected get webPushForm(): FormGroup<WebPushFormControls> | undefined {
    return this.formManager.getForm('messageContent') as
      | FormGroup<WebPushFormControls>
      | undefined
  }

  protected get actions():
    | FormArray<FormGroup<WebPushActionControls>>
    | undefined {
    return this.webPushForm?.get('actions') as
      | FormArray<FormGroup<WebPushActionControls>>
      | undefined
  }

  protected addAction(): void {
    const actionGroup = this.fb.group<WebPushActionControls>({
      actionTitle: this.fb.nonNullable.control('', Validators.required),
      actionUrl: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^https:\/\//),
      ]),
    })
    this.actions?.push(actionGroup)
  }

  protected removeAction(index: number): void {
    this.actions?.removeAt(index)
  }
}
