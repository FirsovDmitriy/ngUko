import { inject, Injectable } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { MultiStepFormManager } from '../_state/multi-step-form.manager'
import { steps } from '../constants'

export interface EmailFormControls {
  subject: FormControl<string>
  emailFrom: FormControl<string>
  recipients: FormControl<string>
  emailTemplate: FormControl<string>
  emailCc: FormControl<string>
  emailBcc: FormControl<string>
  attachments: FormArray<FormControl<any>>
}

export interface WebPushActionControls {
  actionTitle: FormControl<string>
  actionUrl: FormControl<string>
}

export interface WebPushFormControls {
  title: FormControl<string>
  body: FormControl<string>
  webPushTargetUrl: FormControl<string>
  icon: FormControl<string>
  image: FormControl<string>
  webPushTTL: FormControl<number | null>
  actions: FormArray<FormGroup<WebPushActionControls>>
}

@Injectable({ providedIn: 'root' })
export class EditorFormService {
  private readonly formManager = inject(MultiStepFormManager)
  private readonly fb = inject(FormBuilder)

  public contentForm: FormGroup | undefined

  private readonly formFactory: Record<string, () => FormGroup> = {
    email: () => this.buildEmailForm(),
    mobilePush: () => this.buildMobilePushForm(),
    webPush: () => this.buildWebPushForm(),
  }

  constructor() {}

  public createContentForm(type: string): void {
    const creator = this.formFactory[type]
    if (!creator) {
      console.warn(`Нет создателя формы для типа: ${type}`)
      return
    }

    this.formManager.unregister(steps.MESSAGE_CONTENT)
    this.contentForm = creator()

    this.formManager.register(steps.MESSAGE_CONTENT, this.contentForm)
  }

  private buildEmailForm(): FormGroup<EmailFormControls> {
    return this.fb.group<EmailFormControls>({
      subject: this.fb.nonNullable.control('', Validators.required),
      emailFrom: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      recipients: this.fb.nonNullable.control('', [Validators.required]),
      emailTemplate: this.fb.nonNullable.control('', Validators.required),

      emailCc: this.fb.nonNullable.control(''),
      emailBcc: this.fb.nonNullable.control(''),

      attachments: this.fb.array([]),
    })
  }

  private buildWebPushForm(): FormGroup<WebPushFormControls> {
    const actionsArray = this.fb.array<FormGroup<WebPushActionControls>>([])

    return this.fb.group<WebPushFormControls>({
      title: this.fb.nonNullable.control('', Validators.required),
      body: this.fb.nonNullable.control('', Validators.required),

      icon: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^https:\/\//),
      ]),
      image: this.fb.nonNullable.control('', [
        Validators.pattern(/^https:\/\//),
      ]),

      webPushTargetUrl: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^https:\/\//),
      ]),
      webPushTTL: this.fb.control<number | null>(null),

      actions: actionsArray,
    })
  }

  private buildMobilePushForm(): FormGroup {
    return this.fb.group({})
  }
}
