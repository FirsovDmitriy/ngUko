import { inject, Injectable, OnInit } from '@angular/core'
import { FormState, MultiStepFormStore } from './multi-step-form.store'
import { debounceTime, merge, Observable, Subscription } from 'rxjs'
import { AbstractControl, FormGroup } from '@angular/forms'
import { MultiStepFormQuery } from './multi-step-form.query'

/**
 * MultiStepForm manager
 *
 * @export
 * @class MultiStepFormManager
 */
@Injectable({ providedIn: 'root' })
export class MultiStepFormManager {
  private readonly store = inject(MultiStepFormStore)
  private readonly query = inject(MultiStepFormQuery)

  private readonly forms = new Map<string, AbstractControl>()

  // selectForm(
  //   formName: keyof FormsState,
  //   options: { filterNil: true } = { filterNil: true }
  // ): Observable<AkitaAbstractGroup> {
  //   return this.query.select(state => state[formName as any]).pipe(options.filterNil ? filterNil : s => s);
  // }

  // getForm<Name extends keyof FormsState>(formName: keyof FormsState): AkitaAbstractGroup<FormsState[Name]> {
  //   return this.query.getValue()[formName as any];
  // }

  public getForm<T extends AbstractControl = AbstractControl>(
    formName: string,
  ): T | undefined {
    return this.forms.get(formName) as T
  }

  public upsert<T = any>(formName: string, control: AbstractControl) {
    this.forms.set(formName, control)

    merge(control.valueChanges, control.statusChanges)
      .pipe(debounceTime(2000))
      .subscribe(() => {
        this.updateState(formName, control)
      })
  }

  private updateState(formName: string, control: AbstractControl) {
    this.store.update(state => ({
      ...state,
      values: {
        ...state.values,
        [formName]: this.transformationFromToStore(control),
      },
    }))
  }

  private transformationFromToStore(
    control: Partial<AbstractControl>,
  ): FormState {
    return {
      isValid: control.valid ?? false,
      isDirty: control.dirty ?? false,
      value: control.value,
      errors: control.errors,
    }
  }

  public Log() {
    console.log('Hello Akita.js')
  }
}
