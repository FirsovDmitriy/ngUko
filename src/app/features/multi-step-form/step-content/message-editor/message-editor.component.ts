import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { EmailEditorComponent } from './email-editor.component'

@Component({
  selector: 'uko-message-editor',
  standalone: true,
  imports: [ReactiveFormsModule, EmailEditorComponent],
  templateUrl: './message-editor.component.html',
})
export class MessageEditorComponent {
  private readonly fb = inject(FormBuilder)
  protected messageType = 'email'
}
