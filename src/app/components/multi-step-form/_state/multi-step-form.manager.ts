import { inject, Injectable, Signal } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  startWith,
  Subject,
  Subscription,
  tap,
} from 'rxjs'
import {
  FormState,
  MultiStepFormState,
  MultiStepFormStore,
} from './multi-step-form.store'
import { MultiStepFormQuery } from './multi-step-form.query'
import { toSignal } from '@angular/core/rxjs-interop'

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
  private readonly subscriptions = new Map<string, Subscription>()
  private readonly formsChanged$ = new Subject()

  // selectForm(
  //   formName: keyof FormsState,
  //   options: { filterNil: true } = { filterNil: true }
  // ): Observable<AkitaAbstractGroup> {
  //   return this.query.select(state => state[formName as any]).pipe(options.filterNil ? filterNil : s => s);
  // }

  // getForm<Name extends keyof FormsState>(formName: keyof FormsState): AkitaAbstractGroup<FormsState[Name]> {
  //   return this.query.getValue()[formName as any];
  // }

  //selectValue<T = any>(formName: keyof FormsState, path?: string): Observable<T> {
  //   return this.selectControl(formName, path).pipe(map(control => control.value));
  // }

  public selectValue<T = any>(formName: string): Signal<T | undefined> {
    return toSignal(
      this.query.select(
        (state: MultiStepFormState) => state.values[formName]?.value as T,
      ),
      { initialValue: undefined },
    )
  }

  public getForm<T = any>(stepId: string): T | undefined {
    return this.forms.get(stepId) as T
  }

  // selectNgForm(formName: keyof FormsState): Observable<AbstractControl> {
  //   return this.selectForm(formName, { filterNil: true }).pipe(
  //     map(() => this.ngForms[formName as any]),
  //   )
  // }

  public selectForm<T extends AbstractControl>(
    formName: string,
  ): Observable<T | null> {
    return this.formsChanged$.pipe(
      startWith(void 0),
      map(() => (this.forms.get(formName) as T) ?? null),
      distinctUntilChanged(),
    )
  }

  public register<TForm extends AbstractControl>(
    stepId: string,
    form: TForm,
  ): TForm {
    this.subscriptions.get(stepId)?.unsubscribe()
    this.forms.set(stepId, form)
    this.formsChanged$.next(stepId)
    this.updateState(stepId, form)

    const subscription = merge(form.valueChanges, form.statusChanges).subscribe(
      () => this.updateState(stepId, form),
    )
    this.subscriptions.set(stepId, subscription)

    return form
  }

  public unregister(stepId: string): void {
    this.subscriptions.get(stepId)?.unsubscribe()
    this.subscriptions.delete(stepId)
    this.forms.delete(stepId)
    this.formsChanged$.next(stepId)

    this.store.update(state => {
      const values = { ...state.values }
      delete values[stepId]
      return { ...state, values }
    })
  }

  public getAllValues(): Record<string, unknown> {
    return Object.fromEntries(
      [...this.forms].map(([stepId, form]) => [stepId, form.getRawValue()]),
    )
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
      isTouched: control.touched ?? false,
      isDirty: control.dirty ?? false,
      value: control.value,
      errors: control.errors,
    }
  }
}
