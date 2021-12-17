import { TestBed } from '@angular/core/testing';

import { SubplateformeService } from './subplateforme.service';

describe('SubplateformeService', () => {
  let service: SubplateformeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubplateformeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
