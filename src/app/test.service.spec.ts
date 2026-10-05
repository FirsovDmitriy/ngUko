import { TestBed } from "@angular/core/testing"
import { TestService } from "./test.service"
import { CheckValueService } from "./check-value.service"

describe('A simple test ', () => {
  let service: TestService
  const mockValueService = { check: () => true }

  beforeEach(() => {
    // service = new TestService(mockValueService)
    TestBed.configureTestingModule({
      providers: [
        TestService,
        {provide: CheckValueService, useValue: mockValueService}
      ],
    })

    service = TestBed.inject(TestService)
  })

  it('Must create an instance of the class', () => {
    // const service = new TestService()
    expect(service).toBeTruthy()
  })

  it('Must sum', () => {
    const sum = service.sum(1, 2)
    expect(sum).toBe(3)
  })

  xit('Return undefined', () => {
    const sum = service.sum(1)
    expect(sum).toBeUndefined()
  })
})
