import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubplateformeComponent } from './view-subplateforme.component';

describe('ViewSubplateformeComponent', () => {
  let component: ViewSubplateformeComponent;
  let fixture: ComponentFixture<ViewSubplateformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubplateformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubplateformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
