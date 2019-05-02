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
         console.log(this.global.gender);
         if (this.global.outfit == "url('https://render.bitstrips.com/render/10215854/null-v3.png?cropped=%22body%22&outfit=1018031&head_rotation=0&body_rotation=0&width=400')" && this.global.gender == 2){
           console.log("1");
           this.global.outfit = "url('https://render.bitstrips.com/render/10215854/" + this.global.color + "-v1.png?cropped=%22body%22&outfit=944137&head_rotation=0&body_rotation=0&width=400')"
         }
         if (this.global.outfit == "url('https://render.bitstrips.com/render/10215854/null-v3.png?cropped=%22body%22&outfit=962366&head_rotation=0&body_rotation=0&width=400')"  && this.global.gender == 2){
             console.log("2");
            this.global.outfit = "url('https://render.bitstrips.com/render/10215854/" + this.global.color + "-v1.png?cropped=%22body%22&outfit=957114&head_rotation=0&body_rotation=0&width=400')";
          }
         if (this.global.outfit == "url('https://render.bitstrips.com/render/10215854/null-v3.png?cropped=%22body%22&outfit=1017606&head_rotation=0&body_rotation=0&width=400')" && this.global.gender == 2){
            console.log("3");
             this.global.outfit = "url('https://render.bitstrips.com/render/10215854/"+ this.global.color +"-v1.png?cropped=%22body%22&outfit=889503&head_rotation=0&body_rotation=0&width=400')";

           }

         if (!this.global.outfit.includes(this.global.color)) {
              //this.navCtrl.getActiveChildNav();
           this.global.outfit = this.global.outfit.replace("null", this.global.color);
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
         }
         console.log("ionViewWillEnter",this.global.outfit);
   }
}
