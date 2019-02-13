import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueSlideshowComponent } from './queue-slideshow.component';

describe('QueueSlideshowComponent', () => {
  let component: QueueSlideshowComponent;
  let fixture: ComponentFixture<QueueSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
