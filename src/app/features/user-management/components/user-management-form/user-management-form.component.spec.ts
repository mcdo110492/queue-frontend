import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementFormComponent } from './user-management-form.component';

describe('UserManagementFormComponent', () => {
  let component: UserManagementFormComponent;
  let fixture: ComponentFixture<UserManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
