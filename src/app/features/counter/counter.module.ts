import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialCompModule } from "@material/index";
import { SharedModule } from "@shared/shared.module";

import { CounterRoutingModule } from "./counter-routing.module";
import * as fromComponents from "./components";
import { StoreModule } from "@ngrx/store";
import * as fromCounter from "./store/reducers/counter.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CounterEffects } from "./store/effects/counter.effects";
import { CounterService } from "./services/counter.service";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    CounterRoutingModule,
    MaterialCompModule,
    SharedModule,
    StoreModule.forFeature("counter", fromCounter.reducer),
    EffectsModule.forFeature([CounterEffects])
  ],
  providers: [CounterService]
})
export class CounterModule {}