import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdvanceGridComponent } from './advance-grid/advance-grid.component';
import { AdvColumnComponent } from './advance-grid/adv-column/adv-column.component';
import { AdvRowComponent } from './advance-grid/adv-row/adv-row.component';


@NgModule({
  declarations: [
    AppComponent,
    AdvanceGridComponent,
    AdvColumnComponent,
    AdvRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
