import { inject, Injectable } from '@angular/core';
import { TestStore } from './test.store';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private http = inject(HttpClient);

  constructor(private store: TestStore) {}

  characters() {
    const items = localStorage.getItem('characters')
    if(items) {
      this.store.update({ items: JSON.parse(items) })
    }
  }
}
