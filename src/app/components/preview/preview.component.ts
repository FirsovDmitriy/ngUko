import { Component, inject } from '@angular/core'
import { EmailPreviewComponent } from './email-preview/email-preview.component'
import { MultiStepFormManager } from '../multi-step-form/_state/multi-step-form.manager'
import { steps } from '../multi-step-form/constants'

@Component({
  selector: 'uko-preview',
  imports: [EmailPreviewComponent],
  templateUrl: './preview.template.html',
})
export class PreviewComponent {
  private readonly formManager = inject(MultiStepFormManager)
  protected readonly messageType = this.formManager.selectValue(
    steps.MESSAGE_TYPE,
  )
}
