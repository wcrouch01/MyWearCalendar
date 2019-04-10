import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Storage } from '@ionic/storage';
import { CalendarSetPage } from '../calendar-set/calendar-set';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  events: any;
  IOSevent: boolean;
  calendars: any;

  constructor(public navCtrl: NavController, private calendar: Calendar, private platform: Platform,
    public global: MyglobalsProvider, private storage: Storage) {
      this.IOSevent = true;

      //get global events
      this.events = this.global.events;

  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad CalendarPage');

    //load events if they don't exist yet
    this.global.loadAll();
  }


  editTransport(i){

    i = parseInt(i);

    if (i == this.events.length-1){
      this.navCtrl.push(CalendarSetPage, {
        from: this.events[i].title,
        ind: i
      });
    }else if (i == -1){
      this.navCtrl.push(CalendarSetPage, {
        to: this.events[0].title,
        ind: 0
      });
    }else{
      this.navCtrl.push(CalendarSetPage, {
        from: this.events[i].title,
        to: this.events[i+1].title,
        ind: i
      });
    }
    
  }

  //before the first event
  editPreTransport(){

    this.navCtrl.push(CalendarSetPage, {
        to: this.events[0].title,
        ind: 0
      });
  }

}