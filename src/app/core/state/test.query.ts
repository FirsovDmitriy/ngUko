import { Query } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { ItemsState, TestStore } from "./test.store";

@Injectable({
  providedIn: 'root'
})
export class TestQuery extends Query<ItemsState> {
  constructor(protected override store: TestStore) {
    super(store)
  }
  items$ = this.select(state => state.items)
}
