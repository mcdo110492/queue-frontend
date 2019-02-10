import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTokenViewComponent } from './issue-token-view.component';

describe('IssueTokenViewComponent', () => {
  let component: IssueTokenViewComponent;
  let fixture: ComponentFixture<IssueTokenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTokenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTokenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
