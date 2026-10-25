import {
  AfterContentInit,
  Component,
  computed,
  effect,
  input,
  OnInit,
  output,
  Signal,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { AbstractControl } from '@angular/forms'
import { of, startWith, switchMap, tap } from 'rxjs'

export type StepState = 'error' | 'pass' | 'normal'

@Component({
  selector: 'uko-step',
  imports: [],
  template: `<ng-template><ng-content /></ng-template>`,
})
export class StepComponent implements AfterContentInit, OnInit {
  public readonly contentTemplate =
    viewChild.required<TemplateRef<any>>(TemplateRef)
  public readonly stepControl = input<AbstractControl>()
  public readonly label = input('')
  public readonly onInvalid = output()

  private _interacted = signal(false)
  public readonly interacted = this._interacted.asReadonly()

  private readonly _controlStatus = toSignal(
    toObservable(this.stepControl).pipe(
      tap(value => console.log('Step Control:', value?.value)),
      switchMap(control =>
        control
          ? control.statusChanges.pipe(startWith(control.status))
          : of('VALID' as const),
      ),
    ),
    { initialValue: 'VALID' as const },
  )

  constructor() {
    effect(() => {
      const status = this._controlStatus()
      if (status === 'INVALID' && this._interacted()) {
        this.onInvalid.emit()
      }
    })
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {}

  public completed = computed(() => {
    const control = this.stepControl()
    const status = this._controlStatus()
    const isValid = !control || status === 'VALID'
    return this._interacted() && isValid
  })

  public markAsInteracted() {
    if (!this._interacted()) {
      this._interacted.set(true)
    }
  }

  public stepState: Signal<StepState> = computed(() => {
    const control = this.stepControl()
    const status = this._controlStatus()
    if (this._interacted() && !!control && status === 'INVALID') return 'error'
    if (this._interacted()) return 'pass'
    return 'normal'
  })
}
