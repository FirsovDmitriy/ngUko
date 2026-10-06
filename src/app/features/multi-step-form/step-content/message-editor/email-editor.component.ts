import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TuiInputModule } from '@taiga-ui/kit'
import { TextfieldComponent } from '../../../../ui-kit/textfield/text-field.component'
import { TuiButtonModule } from '@taiga-ui/core'
import { CodeHtmlComponent } from './code-html.component'

@Component({
  selector: 'uko-email-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TextfieldComponent,
    TuiButtonModule,
    CodeHtmlComponent
  ],
  templateUrl: './email-editor.component.html',
})
export class EmailEditorComponent {
  private readonly fb = inject(FormBuilder)

  public readonly emailForm: FormGroup<any> = this.fb.group<any>({
    subject: this.fb.nonNullable.control('', Validators.required),
    emailFrom: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    recipients: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    template: this.fb.nonNullable.control('', Validators.required),
    emailCc: this.fb.nonNullable.control(''),
    emailBcc: this.fb.nonNullable.control(''),

    attachments: this.fb.array([]),
  })
}
