import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNowServingComponent } from './display-now-serving.component';

describe('DisplayNowServingComponent', () => {
  let component: DisplayNowServingComponent;
  let fixture: ComponentFixture<DisplayNowServingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNowServingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNowServingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
