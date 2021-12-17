import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubplateformeSideBarComponent } from './subplateforme-side-bar.component';

describe('SubplateformeSideBarComponent', () => {
  let component: SubplateformeSideBarComponent;
  let fixture: ComponentFixture<SubplateformeSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubplateformeSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubplateformeSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
