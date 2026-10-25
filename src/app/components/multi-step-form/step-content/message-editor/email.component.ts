import { TuiInputModule } from "@taiga-ui/legacy";
import { TuiButton } from "@taiga-ui/core";
import { TuiEditor, TuiEditorSocket } from "@taiga-ui/editor";
import { ChangeDetectionStrategy, Component, inject, INJECTOR, Injector } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  TuiEditorTool,
} from '@taiga-ui/editor'
import { DomSanitizer } from '@angular/platform-browser'
import { CodeHtmlComponent } from './code-html.component'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'
import { steps } from '../../constants'
import { ErrorTextComponent } from '../../../../ui-kit/error-text'
import { TextfieldComponent } from '../../../../ui-kit/textfield'

@Component({
  selector: 'uko-email',
  imports: [
    TuiEditorSocket,
    TuiEditor,
    ReactiveFormsModule,
    TuiButton,
    ErrorTextComponent,
    TextfieldComponent,
    CodeHtmlComponent
  ],
  templateUrl: './email.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class EmailComponent {
  private readonly fb = inject(FormBuilder)
  private readonly sanitizer = inject(DomSanitizer)
  protected readonly emailForm = inject(
    MultiStepFormManager,
  ).getForm<FormGroup>(steps.MESSAGE_CONTENT)

  protected readonly tools = [
    TuiEditorTool.Undo,
    TuiEditorTool.Bold,
    TuiEditorTool.Italic,
    TuiEditorTool.Link,
  ]

  get emailAttachments(): FormArray {
    return this.emailForm?.get('attachments') as FormArray
  }

  get safeTemplate() {
    const val = this.emailForm?.controls['emailTemplate'].value
    return val ? this.sanitizer.bypassSecurityTrustHtml(val) : ''
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
    this.emailAttachments.push(this.createAttachmentGroup())
  }

  protected loadDefaultTemplate() {
    //
  }
}
