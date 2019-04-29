import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController, public global: MyglobalsProvider) {

  }

   ionViewDidEnter() {
         console.log("ionViewWillEnter",this.global.outfit);
         console.log(this.global.color);
         if (!this.global.outfit.includes(this.global.color)) {
          this.navCtrl.getActiveChildNavs;
           this.global.outfit = this.global.outfit.replace("null", this.global.color);
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
         }

   }
}
