import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { FeaturesComponent } from './features/features.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { CommonComponent } from './about/common/common.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoPageFoundComponent,
    FeaturesComponent,
    AboutComponent,
    ContactComponent,
    RaiseTicketComponent,
    CommonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : AppInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
