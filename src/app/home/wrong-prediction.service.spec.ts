import { TestBed } from '@angular/core/testing';

import { WrongPredictionService } from './wrong-prediction.service';

describe('WrongPredictionService', () => {
  let service: WrongPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrongPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
