import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MultiStepFormState, MultiStepFormStore } from './multi-step-form.store';

@Injectable({ providedIn: 'root' })
export class MultiStepFormQuery extends Query<MultiStepFormState> {
  constructor(protected override store: MultiStepFormStore) {
    super(store);
  }
}
