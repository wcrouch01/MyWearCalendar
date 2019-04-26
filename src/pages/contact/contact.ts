import { Component } from '@angular/core';
import { NavController, NavParams, IonicApp, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingsSetPage } from '../settings-set/settings-set';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  gender: any;
  color: any;
  notifications:any;
  pushPage:any;
  tempCold:any;
  tempWarm:any;


  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams,
    public global: MyglobalsProvider, private platform: Platform) {

    this.pushPage = false;

    this.storage.get('gender').then((val) => {
      this.gender = val;

    });

    this.storage.get('color').then((val) => {
      this.global.color = val;
      this.color = 'url(https://render.bitstrips.com/v2/cpanel/10212369-' + val + '-v1.png?transparent=1&amp;palette=1&amp;width=300';
      console.log(this.color);
    });

    this.storage.get('notifications').then((val) => {
      this.notifications = val;

    });
  }

  ionViewDidEnter() {
    this.tempCold = this.roundNumber(this.global.toleranceCold*39, 2);
    this.tempWarm = this.roundNumber(this.global.toleranceWarm*61, 2);

    if (this.pushPage == true) {
      console.log("In the pushPage==true");
        this.gender = this.navParams.get('gender');
        this.notifications = this.navParams.get('notifications');
        this.color = 'url(https://render.bitstrips.com/v2/cpanel/10212369-' + this.global.color + '-v1.png?transparent=1&amp;palette=1&amp;width=300';
        console.log(this.color);
        this.pushPage = false;
    }
  }

  // Arguments: number to round, number of decimal places
  roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
  }

  update(){
    console.log("Sending: " + this.notifications + "  " + this.gender + " " + this.color);
    this.pushPage = true;

    this.navCtrl.push(SettingsSetPage, {
      gender: this.gender,
      color: this.global.color,
      notifications: this.notifications
    });
  }

  clearCache(){
    this.storage.clear();
    this.platform.exitApp();
  }

}
