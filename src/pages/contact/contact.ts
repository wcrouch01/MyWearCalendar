import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingsSetPage } from '../settings-set/settings-set';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  gender: any;
  color: any;
  notifications:any;
  passColor: any;
  pushPage:any;

  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams) {
    this.pushPage = false;

    this.storage.get('gender').then((val) => {
      this.gender = val;

    });

    this.storage.get('color').then((val) => {
      this.passColor = val;
      this.color = 'url(https://render.bitstrips.com/v2/cpanel/10212369-' + val + '-v1.png?transparent=1&amp;palette=1&amp;width=300';
      console.log(this.color);
    });

    this.storage.get('notifications').then((val) => {
      this.notifications = val;

    });
  }

  ionViewDidEnter() {
    if (this.pushPage == true) {
      console.log("In the pushPage==true");
        this.passColor = this.navParams.get('thing1');
        this.gender = this.navParams.get('gender');
        this.notifications = this.navParams.get('notifications');
        this.color = 'url(https://render.bitstrips.com/v2/cpanel/10212369-' + this.passColor + '-v1.png?transparent=1&amp;palette=1&amp;width=300';
        console.log(this.color);
        this.pushPage = false;
    }
  }

  update(){
    console.log("Sending: " + this.notifications + "  " + this.gender + " " + this.color);
    this.pushPage = true;

    this.navCtrl.push(SettingsSetPage, {
      gender: this.gender,
      color: this.passColor,
      notifications: this.notifications
    });
  }

  clearCache(){
    this.storage.clear();
  }

}
