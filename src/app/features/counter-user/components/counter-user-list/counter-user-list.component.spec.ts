import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CounterUserListComponent } from "./counter-user-list.component";

describe("CounterUserListComponent", () => {
  let component: CounterUserListComponent;
  let fixture: ComponentFixture<CounterUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterUserListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
