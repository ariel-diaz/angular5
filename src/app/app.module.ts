import { ApiService } from './api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APIInterceptor } from './helpers/api.interceptor';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import {EmojiPickerModule} from 'ng-emoji-picker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    EmojiPickerModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
