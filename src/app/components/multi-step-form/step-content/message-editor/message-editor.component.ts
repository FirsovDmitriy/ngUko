import { Component, effect, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { EmailComponent } from './email.component'
import { WebPushComponent } from './web-push.component'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'
import { steps } from '../../constants'

@Component({
  selector: 'uko-message-editor',
  imports: [ReactiveFormsModule, EmailComponent, WebPushComponent],
  templateUrl: './message-editor.template.html',
})
export class MessageEditorComponent {
  private readonly formManager = inject(MultiStepFormManager)
  protected messageType = this.formManager.selectValue<string>(
    steps.MESSAGE_TYPE,
  )

  constructor() {
    effect(() => {
      const type = this.messageType()
    })
  }
}
