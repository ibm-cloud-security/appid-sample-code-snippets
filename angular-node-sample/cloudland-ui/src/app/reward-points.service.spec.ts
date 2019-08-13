import { TestBed, inject } from '@angular/core/testing';

import { RewardPointsService } from './reward-points.service';

describe('RewardPointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RewardPointsService]
    });
  });

  it('should be created', inject([RewardPointsService], (service: RewardPointsService) => {
    expect(service).toBeTruthy();
  }));
});
