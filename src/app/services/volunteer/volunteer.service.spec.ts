/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VolunteerService } from './volunteer.service';

describe('VolunteerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolunteerService]
    });
  });

  it('should ...', inject([VolunteerService], (service: VolunteerService) => {
    expect(service).toBeTruthy();
  }));
});
