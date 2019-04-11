import { Component } from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 
  events: any;
  IOSevent: boolean;
  calendars: any;

  constructor(public navCtrl: NavController, private calendar: Calendar, private platform: Platform) {
      this.IOSevent = true;
  }

  ionViewDidEnter(){
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
        this.events = [{title: "NEW TITLE",location: "Madison", startDate: "Today", endDate: "Tomo"},{title: "NEW TITLE",location: "Madison", startDate: "Today", endDate: "Tomo"}];
    }
  }

  test(){}

}
