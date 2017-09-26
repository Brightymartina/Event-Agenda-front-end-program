import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Event } from './event';

@Injectable()
export class EventService {
    //URLs for CRUD operations
    allEventsUrl = "http://localhost:8080/api/events/get";
    eventUrl = "http://localhost:8080/api/events/post";
    
    eventUrl2="http://localhost:8080/api/events/get/eventId";
 
    eventUrl3="http://localhost:8080/api/events/update/event";
  
    eventUrl4="http://localhost:8080/api/events/delete/eventId";
   
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
    getAllEvents(): Observable<Event[]> {
        return this.http.get(this.allEventsUrl)
	       .map(this.extractData)
	       .catch(this.handleError);

    }
    //Create article
    createEvent(event:Event):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.eventUrl, event, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch article by id
    getEvent(eventId: string): Observable<Event> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let cpParams = new URLSearchParams();
	cpParams.set('id', eventId);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.eventUrl2, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update article
    updateEvent(event: Event):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.eventUrl3, event, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete article	
    deleteEvent(eventId: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let cpParams = new URLSearchParams();
	cpParams.set('id', eventId);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.eventUrl4, options)
	       .map(success => success.status)
	       .catch(this.handleError);
    }		
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 