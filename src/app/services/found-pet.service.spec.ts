import { TestBed } from '@angular/core/testing';

import { FoundPetService } from './found-pet.service';

describe('FoundPetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoundPetService = TestBed.get(FoundPetService);
    expect(service).toBeTruthy();
  });
});
