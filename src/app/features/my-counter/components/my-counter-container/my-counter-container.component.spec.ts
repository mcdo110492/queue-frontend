import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCounterContainerComponent } from './my-counter-container.component';

describe('MyCounterContainerComponent', () => {
  let component: MyCounterContainerComponent;
  let fixture: ComponentFixture<MyCounterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCounterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCounterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
