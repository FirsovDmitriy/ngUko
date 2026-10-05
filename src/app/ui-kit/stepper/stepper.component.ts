import {
  AfterContentInit,
  Component,
  computed,
  contentChildren,
  effect,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core'
import { TuiStepperModule } from '@taiga-ui/kit'
import { NgTemplateOutlet } from '@angular/common'
import { StepComponent } from './step.component'
import { TuiButtonModule } from '@taiga-ui/core'

@Component({
  selector: 'uko-stepper',
  standalone: true,
  imports: [TuiStepperModule, NgTemplateOutlet, TuiButtonModule],
  templateUrl: './stepper.component.html',
})
export class StepperComponent implements AfterContentInit {
  public readonly activeIndex = input.required<number>()
  public readonly items = input.required<string[]>()

  public readonly steps = contentChildren(StepComponent)

  public readonly onStepChange = output<number>()

  protected readonly isNextDisabled = computed(() => {
    return this.activeIndex() >= this.items().length - 1
  })

  constructor() {
    effect(() => {
      console.log('Active Index:', this.activeIndex())
    })
  }

  ngAfterContentInit(): void {}

  protected handleStep(step: number) {
    this.onStepChange.emit(step)
  }

  protected handleNext() {
    const next = this.activeIndex() + 1
    if (next < this.items().length) {
      this.onStepChange.emit(next)
    }
  }
}
