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
    public toleranceCold: number;
    public toleranceWarm: number;
    public color: any;
    public outfit: any;
    public gender: any;

  constructor(public http: HttpClient, private calendar: Calendar, private platform: Platform, private storage: Storage) {
    console.log('Hello MyglobalsProvider Provider');
    this.isRun = false;
    this.outfit = "";
    this.gender = null;
  }

  //load everything possible (only once unless the submethods are explicitly called)
  loadAll(){
    if (!this.isRun){
      this.loadEvents();
      this.loadTransportation();
      this.loadTolerance();
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
          }
          else{
            this.events = data;

            for(let i=0; i<this.events.length; i++){
              this.events[i].dtstart = (new Date(this.events[i].startDate.replace(/-/g, '/')));
              this.events[i].dtend = (new Date(this.events[i].endDate.replace(/-/g, '/')));
              this.events[i].startDate = (new Date(this.events[i].startDate.replace(/-/g, '/'))).toLocaleTimeString();;
              this.events[i].endDate = (new Date(this.events[i].endDate.replace(/-/g, '/'))).toLocaleTimeString();;
            }
          }

      }, err => {
          console.error('err', err);
      });

    } else if (this.platform.is('android')) {
        this.calendar.listEventsInRange(start, end).then(data => {
          this.events = data;
          for(let i=0; i<this.events.length; i++){
            this.events[i].startDate = (new Date(this.events[i].dtstart)).toLocaleTimeString();;
            this.events[i].endDate = (new Date(this.events[i].dtend)).toLocaleTimeString();;
          }
        });
    } else {
        let d1 = new Date(); d1.setHours(d1.getHours() + 1);
        let d1e = new Date(); d1e.setHours(d1e.getHours() + 2);
        let d2 = new Date(); d2.setHours(d2.getHours() + 3);
        let d2e = new Date(); d2e.setHours(d2e.getHours() + 5);
        let d3 = new Date(); d3.setHours(d3.getHours() + 7);
        let d3e = new Date(); d3e.setHours(d3e.getHours() + 9);
        this.events = [{title: "Home",location: "Madison", startDate: "Today", endDate: "Tomo", dtstart: d1, dtend: d1e},{title: "Event for the day",location: "Madison", startDate: "Today", endDate: "Tomo", dtstart: d2, dtend: d2e}, {title: "Home",location: "Madison", startDate: "Today", endDate: "Tomo", dtstart: d3, dtend: d3e}];
    }


    console.log("here are events: ");
    console.log(JSON.stringify(this.events));

  }

  //load 'transportation' and 'time' from the local storage if it exists
  loadTransportation(){


    for(let i=0; i<this.events.length; i++){
      //console.log(this.global.events[i]);

      //console.log("Trying to find: "+this.events[i].title.replace(/\s/g, "")+"~"+this.events[i+1].title.replace(/\s/g, ""));

      //if before first event
      if (i == 0){
        this.storage.get("~"+this.events[i].title.replace(/\s/g, "")).then((val) => {
          console.log('Found Pre Event', val);
          if ( val != null) {
            this.events[i].pre_transport = val.transport;
            this.events[i].pre_time = val.time;
          }
        });
      }

      //if last event
      if (i == this.events.length-1){
        this.storage.get(this.events[i].title.replace(/\s/g, "")+"~").then((val) => {
          console.log('Found Event', val);
          if ( val != null) {
            this.events[i].transport = val.transport;
            this.events[i].time = val.time;
          }
        });
      }else{  //every other event in between
        this.storage.get(this.events[i].title.replace(/\s/g, "")+"~"+this.events[i+1].title.replace(/\s/g, "")).then((val) => {
          console.log('Found Post Event', val);
          if ( val != null) {
            this.events[i].transport = val.transport;
            this.events[i].time = val.time;
          }
        });
      }
    }
  }

  loadTolerance(){

    this.storage.get("toleranceCold").then((val) => {
      console.log('Found toleranceCold', val);
      if ( val != null) {
        this.toleranceCold = val;
      }else{
        this.toleranceCold = 1;
      }
    });

    this.storage.get("toleranceWarm").then((val) => {
      console.log('Found toleranceWarm', val);
      if ( val != null) {
        this.toleranceWarm = val;
      }else{
        this.toleranceWarm = 1;
      }
    });


  }

}
