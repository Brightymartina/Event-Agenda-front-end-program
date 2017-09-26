import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EventService } from './event.service';
import { Event } from './event';
import { Agenda } from './agenda';
@Component({
   selector: 'app-article',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class EventComponent implements OnInit { 
  [x: string]: any;
   //Component properties
   allEvents: Event[];
   statusCode: number;
   requestProcessing = false;
   articleIdToUpdate = null;
   processValidation = false;
   //Create form
   EventForm = new FormGroup({
       title: new FormControl('', Validators.required),
       category: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(private eventService: EventService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllEvents();
   }   
   //Fetch all articles
   getAllEvents() {
        this.eventService.getAllEvents()
	   .subscribe(
                data => this.allEvents = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onEventFormSubmit() {
	  this.processValidation = true;   
	  if (this.eventForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
          this.preProcessConfigurations();
	  let edition = this.eventForm.get('edition').value.trim();
	  let date = this.eventForm.get('date').value.trim();
	  let location = this.eventForm.get('location').value.trim();
	  let isActive = this.eventForm.get('isActive').value.trim();
            
	  if (this.eventIdToUpdate === null) {  
	    //Handle create article
	    let event= new Event(null, edition, date,location,isActive);	  
	    this.eventService.createEvent(event)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllEvents();	
			      this.backToCreateEvent();
			},
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update article
	    let event= new Event(this.evnetIdToUpdate,edition, date,location,isActive);	  
	    this.eventService.updateEvent(event)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllEvents();	
			      this.backToCreateEvent();
			},
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadEventToEdit(eventId: string) {
      this.preProcessConfigurations();
      this.eventService.getEvent(eventId)
	      .subscribe(event => {
		            this.eventIdToUpdate = event.eventId;   
		            this.eventForm.setValue({ edition: event.edition, date: event.date,location: event.location,isActive: event.isActive});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteEvent(eventId: string) {
      this.preProcessConfigurations();
      this.eventService.deleteEvent(eventId)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllEvents();	
		      this.backToCreateEvent();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateEvent() {
          this.eventIdToUpdate = null;
          this.eventForm.reset();	  
	  this.processValidation = false;
   }
} 


























