import { TestBed } from '@angular/core/testing';

import { VaktijaService } from './vaktija.service';

describe('VaktijaService', () => {
  let service: VaktijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaktijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
