import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromQueueState from "@features/my-counter/state/queue/queue.reducer";
import * as fromQueueActions from "@features/my-counter/state/queue/queue.actions";
import * as fromQueueSeletors from "@features/my-counter/state/queue/queue.selector";

import * as fromQueuePriorityState from "@features/my-counter/state/queue-priority/queue-priority.reducer";
import * as fromQueuePriorityActions from "@features/my-counter/state/queue-priority/queue-priority.actions";
import * as fromQueuePrioritySelectors from "@features/my-counter/state/queue-priority/queue-priority.selector";

import { TokenModel } from "@features/my-counter/models";

@Component({
  selector: "csab-my-counter-pending",
  templateUrl: "./my-counter-pending.component.html",
  styleUrls: ["./my-counter-pending.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterPendingComponent {
  queues: Observable<TokenModel[]>;
  priorities: Observable<TokenModel[]>;

  checkPriority(priority: number) {
    if (priority === 0) {
      return "primary";
    }

    return "accent";
  }

  callTokenPriority(token: TokenModel) {
    this.priorityStore.dispatch(
      new fromQueuePriorityActions.CallPriority({ token })
    );
  }

  callToken(token: TokenModel) {
    this.store.dispatch(new fromQueueActions.CallToken({ token }));
  }

  constructor(
    private store: Store<fromQueueState.State>,
    private priorityStore: Store<fromQueuePriorityState.State>
  ) {
    this.queues = this.store.select(fromQueueSeletors.selectAllQueue);
    this.priorities = this.store.select(
      fromQueuePrioritySelectors.selectAllQueuePriority
    );
    this.store.dispatch(new fromQueueActions.LoadTokens());
    this.priorityStore.dispatch(
      new fromQueuePriorityActions.LoadQueuePriorities()
    );
  }
}
