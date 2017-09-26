import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EventComponent }  from './app.component';
import { EventService } from './event.service';

@NgModule({
  imports: [     
        BrowserModule,
	HttpModule,
	ReactiveFormsModule
  ],
  declarations: [
	EventComponent
  ],
  providers: [
        EventService
  ],
  bootstrap: [
       EventComponent
  ]
})
export class EventModule { }