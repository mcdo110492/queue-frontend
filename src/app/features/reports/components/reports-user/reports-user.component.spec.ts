import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsUserComponent } from './reports-user.component';

describe('ReportsUserComponent', () => {
  let component: ReportsUserComponent;
  let fixture: ComponentFixture<ReportsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
