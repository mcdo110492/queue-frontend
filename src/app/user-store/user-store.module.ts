import { NgModule } from "@angular/core";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/reducer";

import { UserEffects } from "./store/effect";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature("user", reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserStoreModule {}
