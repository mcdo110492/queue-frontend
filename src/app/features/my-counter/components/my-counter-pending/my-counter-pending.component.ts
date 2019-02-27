import { Component, OnInit } from "@angular/core";

@Component({
  selector: "csab-my-counter-pending",
  templateUrl: "./my-counter-pending.component.html",
  styleUrls: ["./my-counter-pending.component.scss"]
})
export class MyCounterPendingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  queues = [
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 1
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 1
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 0
    },

    {
      ticket_number: 545,
      priority: 1
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 1
    },
    {
      ticket_number: 545,
      priority: 0
    },
    {
      ticket_number: 545,
      priority: 0
    }
  ];

  checkPriority(priority: number) {
    if (priority === 0) {
      return "primary";
    }

    return "accent";
  }
}
