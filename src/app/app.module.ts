import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { MatProgressBarModule } from "@angular/material/progress-bar";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "@core/core.module";

import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressBarModule,
    CoreModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
