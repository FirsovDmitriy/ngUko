import { Component, forwardRef, input } from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { TuiInputModule } from '@taiga-ui/kit'

@Component({
  selector: 'uko-textfield',
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputModule],
  templateUrl: './text-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
  host: {
    // '(change)': '_onChange($event.target.value)'
  },
})
export class TextfieldComponent implements ControlValueAccessor {
  public readonly placeholder = input('')
  public readonly type = input('text')

  protected value = ''
  private _onChange: (value: string) => void = () => {}
  protected _onTouched: () => void = () => {}

  ngOnInit() {}

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }

  writeValue(obj: any): void {
    this.value = obj
  }

  protected onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this._onChange(target.value)
  }
}
