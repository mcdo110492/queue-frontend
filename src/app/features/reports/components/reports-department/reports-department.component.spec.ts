import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDepartmentComponent } from './reports-department.component';

describe('ReportsDepartmentComponent', () => {
  let component: ReportsDepartmentComponent;
  let fixture: ComponentFixture<ReportsDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
