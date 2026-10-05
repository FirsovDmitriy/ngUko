import { TestBed } from "@angular/core/testing"
import { TestingService } from "./testing.service"


describe('TestingService', () => {
  let service: TestingService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestingService]
    })

    service = TestBed.inject(TestingService)
  })

  it('should create', () => {
    expect(service).toBeDefined()
  })
})
