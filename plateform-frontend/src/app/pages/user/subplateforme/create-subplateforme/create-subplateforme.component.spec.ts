import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubplateformeComponent } from './create-subplateforme.component';

describe('CreateSubplateformeComponent', () => {
  let component: CreateSubplateformeComponent;
  let fixture: ComponentFixture<CreateSubplateformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubplateformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubplateformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
