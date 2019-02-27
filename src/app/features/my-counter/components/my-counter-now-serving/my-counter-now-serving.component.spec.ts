import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCounterNowServingComponent } from './my-counter-now-serving.component';

describe('MyCounterNowServingComponent', () => {
  let component: MyCounterNowServingComponent;
  let fixture: ComponentFixture<MyCounterNowServingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCounterNowServingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCounterNowServingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
