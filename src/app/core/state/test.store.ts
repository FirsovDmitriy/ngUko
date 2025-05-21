import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface ItemsState {
  items: string[]
}

@StoreConfig({
  name: 'test'
})
@Injectable({
  providedIn: 'root'
})
export class TestStore extends Store<ItemsState> {
  constructor() {
    super(
      {
        items: []
      }
    )
  }
}