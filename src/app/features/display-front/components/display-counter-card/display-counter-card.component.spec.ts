import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCounterCardComponent } from './display-counter-card.component';

describe('DisplayCounterCardComponent', () => {
  let component: DisplayCounterCardComponent;
  let fixture: ComponentFixture<DisplayCounterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCounterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCounterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
