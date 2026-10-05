import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Store, StoreConfig } from '@datorama/akita';

export interface FormState<T = any> {
  isValid: boolean
  value: T
  errors: ValidationErrors | null | undefined
  isDirty: boolean
}

export interface MultiStepFormState {
  values: Record<string, any>
}

export function createInitialState(): MultiStepFormState {
  return {
    values: {},
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'multiStepForm' })
export class MultiStepFormStore extends Store<MultiStepFormState> {
  constructor() {
    super(createInitialState())
  }
}
