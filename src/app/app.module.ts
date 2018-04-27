import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatButtonModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {CompanyService} from './company.service';
import {FormsModule} from '@angular/forms';
import {Browser} from 'selenium-webdriver';



@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
   ],
  providers: [
    CompanyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
