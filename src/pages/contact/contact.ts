import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  gender: any;
  color: any;
  notifications:any;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get('gender').then((val) => {
      this.gender = val;

    });

    this.storage.get('color').then((val) => {
      this.color = val;
    });

    this.storage.get('notifications').then((val) => {
      this.notifications = val;

    });
  }

}
