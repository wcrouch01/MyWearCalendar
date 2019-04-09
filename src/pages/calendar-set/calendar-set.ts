import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.from = navParams.get("from");
    this.to = navParams.get("to");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarSetPage');
  }

  submit(){

    //validate and save

    this.navCtrl.pop();
  }

}
