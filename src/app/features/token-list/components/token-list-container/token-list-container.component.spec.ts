import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenListContainerComponent } from './token-list-container.component';

describe('TokenListContainerComponent', () => {
  let component: TokenListContainerComponent;
  let fixture: ComponentFixture<TokenListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
