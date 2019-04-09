import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MyglobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyglobalsProvider {

    //declare global variables here, inject them into pages like 'about.ts'
    public events;
    public isRun: boolean;
    private IOSevent: boolean;

  constructor(public http: HttpClient, private calendar: Calendar, private platform: Platform, private storage: Storage) {
    console.log('Hello MyglobalsProvider Provider');
    this.IOSevent = true;
    this.isRun = false;
  }

  //load everything possible (only once unless the submethods are explicitly called)
  loadAll(){
    if (!this.isRun){
      this.loadEvents();
      this.loadTransportation();
      this.isRun = true;
    }
  }

  //get events from calendar
  loadEvents(){
    let start = new Date();
    let end = new Date();
    end.setDate(end.getDate() + 1 );

    if (this.platform.is('ios')) {

      this.calendar.findEvent('', '', '',start, end)
      .then(data => {
          console.log(data.length);
          console.log(JSON.stringify(data));
          console.log('results', JSON.stringify(data, null, '\t'));
          console.log(start, end);
          if (data.length <= 0){
            this.IOSevent = false;
          }
          else{
            this.events = data;
            this.IOSevent = true;

          }

      }, err => {
          console.error('err', err);
          this.IOSevent = false;
      });

    } else if (this.platform.is('android')) {
        this.calendar.listEventsInRange(start, end).then(data => {
          this.events = data;
        });
    } else {
        this.events = [{title: "Home",location: "Madison", startDate: "Today", endDate: "Tomo"},{title: "Event for the day",location: "Madison", startDate: "Today", endDate: "Tomo"}, {title: "Home",location: "Madison", startDate: "Today", endDate: "Tomo"}];
    }

  }

  //load 'transportation' and 'time' from the local storage if it exists
  loadTransportation(){

    
    for(let i=0; i<this.events.length-1; i++){
      //console.log(this.global.events[i]); 

      //console.log("Trying to find: "+this.events[i].title.replace(/\s/g, "")+"~"+this.events[i+1].title.replace(/\s/g, ""));

      this.storage.get(this.events[i].title.replace(/\s/g, "")+"~"+this.events[i+1].title.replace(/\s/g, "")).then((val) => {
        //console.log('Found Event', val);
        if ( val != null) {
          this.events[i].transport = val.transport;
          this.events[i].time = val.time;
        }
        });
    }
  }

}
