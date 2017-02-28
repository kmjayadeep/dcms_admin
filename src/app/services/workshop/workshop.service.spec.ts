/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkshopService } from './workshop.service';

describe('WorkshopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkshopService]
    });
  });

  it('should ...', inject([WorkshopService], (service: WorkshopService) => {
    expect(service).toBeTruthy();
  }));
});
