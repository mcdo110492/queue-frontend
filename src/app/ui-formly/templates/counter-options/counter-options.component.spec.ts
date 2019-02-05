import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOptionsComponent } from './counter-options.component';

describe('CounterOptionsComponent', () => {
  let component: CounterOptionsComponent;
  let fixture: ComponentFixture<CounterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
