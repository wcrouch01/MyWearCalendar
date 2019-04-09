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

    this.navCtrl.push(CalendarSetPage, {
        from: this.events[parseInt(i)].title,
        to: this.events[parseInt(i)+1].title,
        ind: parseInt(i)
      });
  }

}
