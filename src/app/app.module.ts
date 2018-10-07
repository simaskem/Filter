import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { DropdownFilterComponent } from './filter/dropdown-filter/dropdown-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    DropdownFilterComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
