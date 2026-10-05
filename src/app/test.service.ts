import { Injectable } from "@angular/core";
import { CheckValueService } from "./check-value.service";

@Injectable()
export class TestService {

  constructor(private checkValueService: CheckValueService) {}

  sum(x: number, y?: number): number | undefined {
    if(!y) return undefined

    return x + y
  }

  check(): boolean {
    return this.checkValueService.check()
  }
}
