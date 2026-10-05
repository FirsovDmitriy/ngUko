import { Injectable } from "@angular/core";
import { DependencyService1 } from "./dependency1.service";

@Injectable()
export class TestingService {
  constructor(dependency1Service: DependencyService1) {}
}
