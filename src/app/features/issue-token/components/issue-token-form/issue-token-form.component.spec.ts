import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTokenFormComponent } from './issue-token-form.component';

describe('IssueTokenFormComponent', () => {
  let component: IssueTokenFormComponent;
  let fixture: ComponentFixture<IssueTokenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTokenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
