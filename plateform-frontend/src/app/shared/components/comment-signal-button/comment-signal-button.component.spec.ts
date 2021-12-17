import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSignalButtonComponent } from './comment-signal-button.component';

describe('CommentSignalButtonComponent', () => {
  let component: CommentSignalButtonComponent;
  let fixture: ComponentFixture<CommentSignalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentSignalButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSignalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
