import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  usrFb:any;
  preference:any;
  lastOpen:any;
  lastOpenStr:any;
  lastOpenLevel:any;
  losCap:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController, private storage: Storage, 
    public global: MyglobalsProvider) {
    
    this.lastOpen = navParams.get("lastOpen");
    this.lastOpenStr = navParams.get("lastOpenStr");
    this.lastOpenLevel = navParams.get("lastOpenLevel");
    this.losCap = this.lastOpenStr.substr(this.lastOpenStr.indexOf(" ") + 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  submit(){
    console.log(this.usrFb);

    if (this.usrFb === undefined){
      this.presentToast('Please select how good the prediction was.');
      return;
    }
    
    if (this.preference === undefined && (this.usrFb==='bad'||this.usrFb==='okay')){
      this.presentToast('Please select what wear you would have prefered.');
      return;
    }

    //DO MAGIC ALG WITH GLOBALS

    //END MAGIC ALG

    this.navCtrl.pop();
  }

}
