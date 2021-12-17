import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubplateformesComponent } from './list-subplateformes.component';

describe('ListSubplateformesComponent', () => {
  let component: ListSubplateformesComponent;
  let fixture: ComponentFixture<ListSubplateformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubplateformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubplateformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
