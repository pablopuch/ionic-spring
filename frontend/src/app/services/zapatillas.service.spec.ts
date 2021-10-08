import { TestBed } from '@angular/core/testing';

import { ZapatillasService } from './zapatillas.service';

describe('ZapatillasService', () => {
  let service: ZapatillasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZapatillasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
