import { NgModule } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/reducer";

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature("user", reducer)]
})
export class UserStoreModule {}
