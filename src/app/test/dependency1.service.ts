import { Injectable } from "@angular/core";

@Injectable()
export class DependencyService1 {
  defaultValue: string = ''

  get defaultString() {
    return this.defaultValue
  }

  constructor() {}

  returnValue(index: number): string {
    const values = ['One', 'Two', 'Three']
    return values[index]
  }

  initValue() {
    this.defaultValue = 'One'
  }
}
