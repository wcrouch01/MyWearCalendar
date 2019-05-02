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
      //load events if they don't exist yet
      this.global.loadAll();
      
      //get global events
      this.events = this.global.events;
      for (let i = 0; i < this.events.length; i++) {
          console.log(this.events[i].startDate);
      }
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad CalendarPage');


  }


  editTransport(i){

    i = parseInt(i);

    if (i == this.global.events.length-1){
      this.navCtrl.push(CalendarSetPage, {
        from: this.global.events[i].title,
        ind: i
      });
    }else if (i == -1){
      this.navCtrl.push(CalendarSetPage, {
        to: this.global.events[0].title,
        ind: 0
      });
    }else{
      this.navCtrl.push(CalendarSetPage, {
        from: this.global.events[i].title,
        to: this.global.events[i+1].title,
        ind: i
      });
    }

  }


}
