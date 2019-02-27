import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCounterPendingComponent } from './my-counter-pending.component';

describe('MyCounterPendingComponent', () => {
  let component: MyCounterPendingComponent;
  let fixture: ComponentFixture<MyCounterPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCounterPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCounterPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
