import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewModalComponent } from './media-view-modal.component';

describe('MediaViewModalComponent', () => {
  let component: MediaViewModalComponent;
  let fixture: ComponentFixture<MediaViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
