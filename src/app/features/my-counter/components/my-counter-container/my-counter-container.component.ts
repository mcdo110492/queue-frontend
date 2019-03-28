import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromQueueReducer from "@features/my-counter/state/queue/queue.reducer";
import * as fromQueueActions from "@features/my-counter/state/queue/queue.actions";
import * as fromQueueSelectors from "@features/my-counter/state/queue/queue.selector";

import * as fromQueuePriorityReducer from "@features/my-counter/state/queue-priority/queue-priority.reducer";
import * as fromQueuePrioritySelectors from "@features/my-counter/state/queue-priority/queue-priority.selector";
import { Observable } from "rxjs";

@Component({
  selector: "csab-my-counter-container",
  templateUrl: "./my-counter-container.component.html",
  styleUrls: ["./my-counter-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterContainerComponent {
  queueLength$: Observable<number>;
  prioLength$: Observable<number>;

  callNext() {
    this.queueStore.dispatch(new fromQueueActions.CallNext());
  }
  constructor(
    private queueStore: Store<fromQueueReducer.State>,
    private prioStore: Store<fromQueuePriorityReducer.State>
  ) {
    this.queueLength$ = this.queueStore.select(
      fromQueueSelectors.selectQueueTotal
    );
    this.prioLength$ = this.prioStore.select(
      fromQueuePrioritySelectors.selectQueuePriorityTotal
    );
  }
}
