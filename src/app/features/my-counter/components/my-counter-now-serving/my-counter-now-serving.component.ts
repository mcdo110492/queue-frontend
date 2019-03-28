import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromNowServingState from "@features/my-counter/state/now-serving/now-serving.reducer";
import * as fromNowServingSelectors from "@features/my-counter/state/now-serving/now-serving.selector";

import * as fromQueueState from "@features/my-counter/state/queue/queue.reducer";
import * as fromQueueActions from "@features/my-counter/state/queue/queue.actions";
import * as fromQueueSelectors from "@features/my-counter/state/queue/queue.selector";

import * as fromQueuePriorityState from "@features/my-counter/state/queue-priority/queue-priority.reducer";
import * as fromQueuePriorityActions from "@features/my-counter/state/queue-priority/queue-priority.actions";
import * as fromQueuePrioritySelectors from "@features/my-counter/state/queue-priority/queue-priority.selector";

import { TokenModel } from "@features/my-counter/models/token.model";

@Component({
  selector: "csab-my-counter-now-serving",
  templateUrl: "./my-counter-now-serving.component.html",
  styleUrls: ["./my-counter-now-serving.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterNowServingComponent {
  nowServing$: Observable<TokenModel>;
  isLoading$: Observable<boolean>;
  isPriorityLoading$: Observable<boolean>;

  btnDisabled(id: number) {
    if (id === 0) {
      return true;
    }

    return false;
  }

  callAgainToken(token: TokenModel) {
    this.queueStore.dispatch(new fromQueueActions.CallTokenAgain({ token }));
  }

  serveToken(token: TokenModel) {
    this.queueStore.dispatch(new fromQueueActions.ServeToken({ token }));
  }

  completeToken(token: TokenModel) {
    this.queueStore.dispatch(new fromQueueActions.CompleteToken({ token }));
  }

  stopToken(token: TokenModel) {
    this.queueStore.dispatch(new fromQueueActions.StopToken({ token }));
  }

  backToQueue(token: TokenModel) {
    if (token.priority == 1) {
      this.queuePriorityStore.dispatch(
        new fromQueuePriorityActions.BackToPriority({ token })
      );
    } else {
      this.queueStore.dispatch(
        new fromQueueActions.BackToQueueToken({ token })
      );
    }
  }

  constructor(
    private store: Store<fromNowServingState.State>,
    private queueStore: Store<fromQueueState.State>,
    private queuePriorityStore: Store<fromQueuePriorityState.State>
  ) {
    this.nowServing$ = this.store.select(
      fromNowServingSelectors.selectedNowServing
    );
    this.isLoading$ = this.queueStore.select(
      fromQueueSelectors.selectIsLoading
    );
    this.isPriorityLoading$ = this.queuePriorityStore.select(
      fromQueuePrioritySelectors.selectIsLoading
    );
  }
}
