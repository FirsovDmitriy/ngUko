import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
} from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms'
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus'

@Component({
  selector: 'uko-textfield',
  imports: [],
  templateUrl: './textfield.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
})
export class TextfieldComponent implements ControlValueAccessor, OnInit {
  private readonly injector = inject(Injector)
  public readonly type = input('text')
  public readonly required = input(false)
  public readonly label = input<PolymorpheusContent>('')
  public readonly placeholder = input('')

  protected readonly disabled = signal(false)
  protected readonly value = signal('')
  protected readonly focused = signal(false)

  private ngControl: NgControl | null = null

  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  get isInvalid() {
    return this.ngControl?.invalid && this.ngControl?.touched
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { self: true })
  }

  protected handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.value.set(value)
    this.onChange(value)
  }

  protected handleBlur(): void {
    this.focused.set(false)
    this.onTouched()
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '')
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
}
