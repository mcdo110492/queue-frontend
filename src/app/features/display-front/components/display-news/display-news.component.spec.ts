import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNewsComponent } from './display-news.component';

describe('DisplayNewsComponent', () => {
  let component: DisplayNewsComponent;
  let fixture: ComponentFixture<DisplayNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
