import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCounterListComponent } from './my-counter-list.component';

describe('MyCounterListComponent', () => {
  let component: MyCounterListComponent;
  let fixture: ComponentFixture<MyCounterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCounterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCounterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
