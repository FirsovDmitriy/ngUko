import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import { StepperComponent, StepComponent } from '../../ui-kit/stepper'
import { TuiStepperModule } from '@taiga-ui/kit'
import { SelectMessageTypeComponent } from './step-content/select-message-type/select-message-type.component'
import { MultiStepFormManager } from './_state/multi-step-form.manager'
import { MessageEditorComponent } from './step-content/message-editor/message-editor.component'

@Component({
  selector: 'uko-multi-step-form',
  standalone: true,
  imports: [
    SelectMessageTypeComponent,
    StepperComponent,
    TuiStepperModule,
    StepComponent,
    MessageEditorComponent,
  ],
  templateUrl: './multi-step-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepFormComponent implements OnInit {
  private readonly formManager = inject(MultiStepFormManager)
  protected readonly currentIndex = signal(0)

  constructor() {}

  ngOnInit(): void {

    console.log('Message Type:', this.formManager.getForm('messageType'))

    this.formManager
      .getForm('messageType')
      ?.valueChanges.subscribe(val => console.log('Val:', val))
  }

  protected setActiveIndex(index: number) {
    this.currentIndex.set(index)
  }
}
