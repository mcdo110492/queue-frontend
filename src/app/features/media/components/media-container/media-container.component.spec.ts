import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaContainerComponent } from './media-container.component';

describe('MediaContainerComponent', () => {
  let component: MediaContainerComponent;
  let fixture: ComponentFixture<MediaContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
