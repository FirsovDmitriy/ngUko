import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStepComponent } from './common-step.component';

describe('CommonStepComponent', () => {
  let component: CommonStepComponent;
  let fixture: ComponentFixture<CommonStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
