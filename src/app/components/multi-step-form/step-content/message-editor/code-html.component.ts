import { Component, DestroyRef, inject, signal } from '@angular/core'
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core'
import {
  PolymorpheusContent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus'
import { CodeEditor } from '@acrodata/code-editor'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject, takeUntil } from 'rxjs'
import { MultiStepFormManager } from '../../_state/multi-step-form.manager'
import { steps } from '../../constants'

@Component({
  selector: 'uko-code-html',
  imports: [
    TuiButtonModule,
    ReactiveFormsModule,
    PolymorpheusModule,
    CodeEditor,
  ],
  templateUrl: './code-html.template.html',
})
export class CodeHtmlComponent {
  private readonly dialogs = inject(TuiDialogService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly formManager = inject(MultiStepFormManager)

  protected readonly htmlControl = new FormControl('')
  private readonly close$ = new Subject<void>()

  protected readonly options: any = {
    language: 'html',
  }

  private contentForm = this.formManager.getForm<FormGroup>(
    steps.MESSAGE_CONTENT,
  )

  constructor() {
    this.htmlControl.valueChanges.subscribe(code => console.log('CODE', code))
  }

  visibleEditor(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize,
  ): void {
    this.dialogs
      .open(content, {
        label: '',
        header,
        size,
      })
      .pipe(takeUntil(this.close$), takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  protected closeEditor() {
    this.contentForm?.get('emailTemplate')?.patchValue(this.htmlControl.value)
    this.close$.next()
  }
}
