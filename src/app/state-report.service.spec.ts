import { TestBed } from '@angular/core/testing';

import { StateReportService } from './state-report.service';

describe('StateReportService', () => {
  let service: StateReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
