import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';

/**
 * Generated class for the CalendarSetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar-set',
  templateUrl: 'calendar-set.html',
})
export class CalendarSetPage {
    from:any;
    to:any;
    ind:number;
    transport:any;
    time:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: MyglobalsProvider) {
    this.from = navParams.get("from");
    this.to = navParams.get("to");
    this.ind = navParams.get("ind");
    this.global = global;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarSetPage');
  }

  submit(){

    //validate and save

    console.log(this.transport + " "+this.time+" minutes")
    this.global.events[this.ind].transport = this.transport;
    this.global.events[this.ind].time = this.time;

    this.navCtrl.pop();
  }

}
