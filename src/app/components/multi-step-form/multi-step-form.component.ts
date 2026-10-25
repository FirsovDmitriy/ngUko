import { TuiStepper } from "@taiga-ui/kit";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import { StepperComponent, StepComponent } from '../../ui-kit/stepper'
import { SelectMessageTypeComponent } from './step-content/select-message-type/select-message-type.component'
import { MultiStepFormManager } from './_state/multi-step-form.manager'
import { EditorFormService } from './services/editor-form.service'
import { MessageEditorComponent } from './step-content/message-editor/message-editor.component'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { steps } from './constants'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CommonStepComponent } from './step-content/common-step/common-step.component'

@Component({
  selector: 'uko-multi-step-form',
  imports: [
    ReactiveFormsModule,
    SelectMessageTypeComponent,
    StepperComponent,
    TuiStepper,
    StepComponent,
    MessageEditorComponent,
    CommonStepComponent
  ],
  templateUrl: './multi-step-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepFormComponent implements OnInit {
  private readonly formManager = inject(MultiStepFormManager)
  private readonly destroyRef = inject(DestroyRef)
  private readonly fb = inject(FormBuilder)
  private readonly editorFormService = inject(EditorFormService)

  protected readonly contentForm = signal<FormGroup | undefined>(undefined)
  protected readonly currentIndex = signal(0)

  protected readonly messageTypeControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  })

  protected readonly commonFormControls = this.fb.group({
    messageName: this.fb.nonNullable.control('', Validators.required),
    scheduleDelivery: this.fb.nonNullable.control(false),
  })

  ngOnInit(): void {
    this.formManager.register(steps.MESSAGE_TYPE, this.messageTypeControl)
    this.formManager.register(steps.COMMON_SETTINGS, this.commonFormControls)

    this.createContentForm()

    this.formManager
      .selectForm<FormGroup>(steps.MESSAGE_CONTENT)
      ?.subscribe(value => {
        this.contentForm.set(value as any)
      })
  }

  protected setActiveIndex(index: number) {
    this.currentIndex.set(index)
  }

  private createContentForm() {
    this.messageTypeControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(type => {
        this.editorFormService.createContentForm(type)
      })
  }

  protected stepValidation() {
    console.log('Step is invalid')
  }
}
