import { TuiButton } from '@taiga-ui/core'
import { TuiEditor } from '@taiga-ui/editor'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  TUI_EDITOR_DEFAULT_TOOLS,
  provideTuiEditor
} from '@taiga-ui/editor'
import { DomSanitizer } from '@angular/platform-browser'
import { CodeHtmlComponent } from './code-html.component'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'
import { steps } from '../../constants'
import { ErrorTextComponent } from '../../../../ui-kit/error-text'
import { TextfieldComponent } from '../../../../ui-kit/textfield'
import { useEmailTemplateQuery } from '../../services/messages-queries.service'

@Component({
  selector: 'uko-email',
  imports: [
    TuiEditor,
    ReactiveFormsModule,
    TuiButton,
    ErrorTextComponent,
    TextfieldComponent,
    CodeHtmlComponent,
  ],
  templateUrl: './email.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTuiEditor({
      detailsContent: true,
      image: true,
      detailsSummary: true,
      source: true,
      details: true
    }),
  ],
})
export class EmailComponent {
  private readonly fb = inject(FormBuilder)
  private readonly sanitizer = inject(DomSanitizer)
  protected readonly emailForm = inject(
    MultiStepFormManager,
  ).getForm<FormGroup>(steps.MESSAGE_CONTENT)

  readonly tools = TUI_EDITOR_DEFAULT_TOOLS
  private readonly emailTemplateQuery = useEmailTemplateQuery()

  get safeTemplate() {
    const val = this.emailForm?.controls['emailTemplate'].value
    return val ? this.sanitizer.bypassSecurityTrustHtml(val) : ''
  }

  get attachmentControl() {
    return this.emailForm?.get('attachments') as FormArray
  }

  constructor() {
    this.emailForm?.valueChanges.subscribe(value => {
      console.log('Form State:', value)
    })
  }

  private createAttachmentGroup(): FormGroup {
    return this.fb.group({
      attachmentName: [''],
      attachmentFile: [null, [Validators.required]],
    })
  }

  protected addAttachment(): void {
    this.attachmentControl?.push(this.createAttachmentGroup())
  }

  protected async loadDefaultTemplate(): Promise<void> {
    const { data } = await this.emailTemplateQuery.refetch()

    if (data !== undefined) {
      // @ts-ignore
      console.log('Data:', data?.dataDataReceived.htmlContent)
      // @ts-ignore
      this.emailForm?.controls['emailTemplate'].setValue(data?.dataDataReceived[0].htmlContent)
    }
  }
}
