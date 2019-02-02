import { Component, OnInit } from "@angular/core";

@Component({
  selector: "csab-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"]
})
export class CounterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onkeyup(ev) {
    console.log(ev);
  }
}
