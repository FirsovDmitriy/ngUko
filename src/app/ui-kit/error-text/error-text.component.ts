import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector,
  input,
  OnInit,
} from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { AbstractControl } from '@angular/forms'
import {
  PolymorpheusContent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus'
import { map, switchMap } from 'rxjs'

@Component({
  selector: 'uko-error-text',
  imports: [PolymorpheusModule],
  templateUrl: './error-text.component.html',
  providers: [],
})
export class ErrorTextComponent implements OnInit {
  private readonly injector = inject(Injector)
  private readonly destroyRef = inject(DestroyRef)
  public readonly control = input.required<AbstractControl>()

  public readonly errorText = input<PolymorpheusContent | null>(null)

  private readonly showError = toSignal(
    toObservable(this.control).pipe(
      switchMap(control =>
        control.events.pipe(
          map(() => !control.disabled && control.invalid && control.touched),
        ),
      ),
    ),
  )
  protected readonly content = computed(() => {
    return (
      this.showError() && {
        message: this.errorText(),
        context: '',
      }
    )
  })

  constructor() {
    effect(() => {
      console.log('Errors:', this.showError())
    })
  }

  ngOnInit(): void {}
}
