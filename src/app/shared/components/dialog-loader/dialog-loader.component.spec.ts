import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoaderComponent } from './dialog-loader.component';

describe('DialogLoaderComponent', () => {
  let component: DialogLoaderComponent;
  let fixture: ComponentFixture<DialogLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
