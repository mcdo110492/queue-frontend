import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListTableComponent } from './media-list-table.component';

describe('MediaListTableComponent', () => {
  let component: MediaListTableComponent;
  let fixture: ComponentFixture<MediaListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
