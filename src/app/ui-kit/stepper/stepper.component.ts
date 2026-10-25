import {
  AfterContentInit,
  Component,
  contentChildren,
  effect,
  input,
  output,
} from '@angular/core'
import { TuiStepperModule } from '@taiga-ui/kit'
import { NgTemplateOutlet } from '@angular/common'
import { StepComponent } from './step.component'
import { TuiButtonModule } from '@taiga-ui/core'

@Component({
  selector: 'uko-stepper',
  imports: [TuiStepperModule, NgTemplateOutlet, TuiButtonModule],
  templateUrl: './stepper.component.html',
})
export class StepperComponent implements AfterContentInit {
  public readonly activeIndex = input.required<number>()
  public readonly linear = input(false)

  public readonly steps = contentChildren(StepComponent)

  public readonly onStepChange = output<number>()

  constructor() {
    effect(() => {})
  }

  ngAfterContentInit(): void {}

  protected handleStep(step: number): boolean {
    if (step < 0 || step >= this.steps().length) {
      return false
    }

    if (this.linear()) {
      // Помечаем текущий шаг как interacted ДО проверки — это включает отображение ошибок, как в Material.
      this.steps()[this.activeIndex()]?.markAsInteracted()

      if (this._anyControlInvalid(step)) {
        return false
      }
    }

    this.onStepChange.emit(step)
    return true
  }

  private _anyControlInvalid(targetStep: number) {
    if (!this.linear() || targetStep < 0) {
      return false
    }

    return this.steps()
      .slice(0, targetStep)
      .some(step => {
        const control = step.stepControl()
        const incomplete = control
          ? control.invalid || control.pending || !step.interacted()
          : !step.completed()

        return incomplete
      })
  }

  protected goTo() {
    const next = this.activeIndex() + 1
    this.onStepChange.emit(next)
  }
}
