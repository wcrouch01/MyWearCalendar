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
      this.global = global;

      //do this in the constructor, otherwise events get overridden on each page load
      this.getEvents();

      //get 'transportation' and 'time' from the local storage if it exists
      this.getTransport();

  }

  ionViewDidEnter(){
    
  }

  getEvents(){
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

    this.global.events = this.events;
  }

  //get 'transportation' and 'time' from the local storage if it exists
  getTransport(){
    for(let i=0; i<this.global.events.length-1; i++){
      //console.log(this.global.events[i]); 

      this.storage.get(this.global.events[i].title.replace(/\s/g, "")+"~"+this.global.events[i+1].title.replace(/\s/g, "")).then((val) => {
        //console.log('Found Event', val);
        if ( val != null) {
          this.global.events[i].transport = val.transport;
          this.global.events[i].time = val.time;
        }
        });
    }
      

  }



  test(i){

    this.navCtrl.push(CalendarSetPage, {
        from: this.events[parseInt(i)].title,
        to: this.events[parseInt(i)+1].title,
        ind: parseInt(i)
      });
  }

}
