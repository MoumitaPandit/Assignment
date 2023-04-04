import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { PaginationPipe } from './pipe/pagination.pipe';
import { RoundUpPipe } from './pipe/round-up.pipe';
import { StoreModule } from '@ngrx/store';
import {counterReducer} from './StateManage/addFav.reducer';
import { UniqueValuePipe } from './pipe/unique-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    PaginationPipe,
    RoundUpPipe,
    UniqueValuePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
     StoreModule.forRoot({add:counterReducer})
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
