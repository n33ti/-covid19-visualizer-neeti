import { TestBed } from '@angular/core/testing';

import { TotalReportService } from './total-report.service';

describe('TotalReportService', () => {
  let service: TotalReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
