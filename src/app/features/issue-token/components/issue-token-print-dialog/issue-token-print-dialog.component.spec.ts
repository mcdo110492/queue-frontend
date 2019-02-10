import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTokenPrintDialogComponent } from './issue-token-print-dialog.component';

describe('IssueTokenPrintDialogComponent', () => {
  let component: IssueTokenPrintDialogComponent;
  let fixture: ComponentFixture<IssueTokenPrintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTokenPrintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTokenPrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
