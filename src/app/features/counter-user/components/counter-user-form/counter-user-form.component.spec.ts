import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterUserFormComponent } from './counter-user-form.component';

describe('CounterUserFormComponent', () => {
  let component: CounterUserFormComponent;
  let fixture: ComponentFixture<CounterUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
