import { AfterContentInit, Component, input, TemplateRef, viewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'uko-step',
  standalone: true,
  imports: [],
  template: `<ng-template><ng-content /></ng-template>`
})
export class StepComponent implements AfterContentInit {
  public contentTemplate = viewChild.required<TemplateRef<any>>(TemplateRef)
  public stepControl = input<AbstractControl>()

  ngAfterContentInit(): void {
    console.log('Template', this.contentTemplate())
  }
}
