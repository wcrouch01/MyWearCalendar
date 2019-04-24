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
  lastOpenLevelStr:any;
  losCap:any;
  windowCold:any;
  windowWarm:any;
  MAX_ELEMENTS = 25;
  SMALL_CHANGE = 1.05;
  LARGE_CHANGE = 1.10;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController, private storage: Storage, 
    public globals: MyglobalsProvider) {
    
    this.lastOpen = navParams.get("lastOpen");
    this.lastOpenStr = navParams.get("lastOpenStr");
    this.lastOpenLevel = navParams.get("lastOpenLevel");
    this.lastOpenLevelStr = navParams.get("lastOpenLevelStr");
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

  getAdj(){
    if (this.usrFb==='okay' || this.usrFb==='bad'){
      if (this.preference == 'muchCool'){
        return this.LARGE_CHANGE;
      }
      else if (this.preference == 'cool'){
        return this.SMALL_CHANGE;
      }
      else if (this.preference == 'warm'){
        return 1 - (this.SMALL_CHANGE-1);
      }
      else if (this.preference == 'muchWarm'){
        return 1 - (this.LARGE_CHANGE-1);
      }
    }else{
      return 1;
    }
  }

  getWindowCold(){
    return this.storage.get("windowCold").then((val) => {
      console.log('Found windowCold ', val);
      if ( val != null) {
        this.windowCold = val;
      }else{
        this.windowCold = Array(1).fill(1);
      }
    });
  }

  getWindowWarm(){
    return this.storage.get("windowWarm").then((val) => {
      console.log('Found windowWarm ', val);
      if ( val != null) {
        this.windowWarm = val;
      }else{
        this.windowWarm = Array(1).fill(1);
      }
    });
  }

  submit(){
    //console.log(this.usrFb);

    if (this.usrFb === undefined){
      this.presentToast('Please select how good the prediction was.');
      return;
    }
    
    if (this.preference === undefined && (this.usrFb==='bad'||this.usrFb==='okay')){
      this.presentToast('Please select what wear you would have prefered.');
      return;
    }

    if (this.lastOpenLevel != "unknown"){
      //DO MAGIC ALG WITH GLOBALS

      //wait for storage to return correctly
      this.getWindowCold().then(_=>{
        this.getWindowWarm().then(_=>{
          
          console.log("cold window: "+this.windowCold+" lastOpenLevel "+this.lastOpenLevel);

          //iterate over the cold window
          var coldAvg = 0;
          for (var i = 0; i < this.windowCold.length; i++){
            coldAvg += parseFloat(this.windowCold[i]);
          }
          coldAvg = coldAvg / parseFloat(this.windowCold.length);

          //iterate over the warm window
          var warmAvg = 0;
          for (var i = 0; i < this.windowWarm.length; i++){
            warmAvg += parseFloat(this.windowWarm[i]);
          }
          warmAvg = warmAvg / parseFloat(this.windowWarm.length);

          //add item to window (appropriately)
          if (this.lastOpenLevel == 0){ //if we predicted cold
            if (this.usrFb == "good"){
              this.windowCold.push(coldAvg);
            }
            else if (this.usrFb == "okay"){
              var adj = this.getAdj();
              if (adj > 1){
                this.windowCold.push(coldAvg/this.SMALL_CHANGE/adj);
              }else{
                this.windowCold.push(coldAvg);
              }
            }else if (this.usrFb == "bad"){
              var adj = this.getAdj();
              if (adj > 1){
                this.windowCold.push(coldAvg/this.LARGE_CHANGE/adj); //make tolerance val smaller (more light jacket)
              }else if (adj < 1){
                //this.windowCold.push(adj/this.SMALL_CHANGE);
                this.windowCold.push(coldAvg);
              }
            }

          }else if (this.lastOpenLevel == 1){ //if we predicted warm
            if (this.usrFb == "good"){
              this.windowWarm.push(warmAvg);
              this.windowCold.push(coldAvg);
            }
            else if (this.usrFb == "okay"){
              var adj = this.getAdj();
              if (adj > 1){
                this.windowWarm.push(warmAvg/this.SMALL_CHANGE/adj); //make tolerance value smaller (more shorts)
              }else if (adj < 1){
                this.windowCold.push(coldAvg/adj*this.SMALL_CHANGE); //make tolerance value larger (more coat)
              }
            }else if (this.usrFb == "bad"){
              var adj = this.getAdj();
              if (adj > 1){
                this.windowWarm.push(warmAvg/this.LARGE_CHANGE/adj); //make tolerance value smaller (more shorts)
              }else if (adj < 1){
                this.windowCold.push(coldAvg/adj*this.LARGE_CHANGE); //make tolerance value larger (more coat)
              }
            }

          }else if (this.lastOpenLevel == 2){ //if we predicted hot
            if (this.usrFb == "good"){
              this.windowWarm.push(warmAvg);
              console.log("doing this 1");
            }
            else if (this.usrFb == "okay"){
              var adj = this.getAdj();
              console.log("doing this 2 adj = "+adj);
              if (adj > 1){
                this.windowWarm.push(warmAvg);
              }else{
                this.windowWarm.push(warmAvg/adj*this.SMALL_CHANGE); //make value larger (less shorts)
              }
            }else if (this.usrFb == "bad"){
              var adj = this.getAdj();
              console.log("doing this 3 adj = "+adj);
              if (adj > 1){
                this.windowWarm.push(warmAvg);
              }else{
                this.windowWarm.push(warmAvg/adj*this.LARGE_CHANGE);
              }
            }
          }

          //shift if more than 25 (or MAX_ELEMENTS) elements
          if (this.windowCold.length > this.MAX_ELEMENTS){
            this.windowCold.shift();
          }
          if (this.windowWarm.length > this.MAX_ELEMENTS){
            this.windowWarm.shift();
          }

          //END MAGIC ALG
          this.storage.set("windowWarm", this.windowWarm);
          this.storage.set("windowCold", this.windowCold);

          //iterate over the cold window
          coldAvg = 0;
          for (var i = 0; i < this.windowCold.length; i++){
            coldAvg += parseFloat(this.windowCold[i]);
          }
          coldAvg = coldAvg / parseFloat(this.windowCold.length);

          //iterate over the warm window
          warmAvg = 0;
          for (var i = 0; i < this.windowWarm.length; i++){
            warmAvg += parseFloat(this.windowWarm[i]);
          }
          warmAvg = warmAvg / parseFloat(this.windowWarm.length);

          //this.windowWarm.push(5);
          console.log("setting new tolerance warm: "+this.globals.toleranceWarm+" -> "+warmAvg+ " window "+this.windowWarm);
          console.log("setting new tolerance cold: "+this.globals.toleranceCold+" -> "+coldAvg+ " window "+this.windowCold);
          this.storage.set("toleranceWarm", warmAvg);
          this.storage.set("toleranceCold", coldAvg);
          this.globals.toleranceWarm = warmAvg;
          this.globals.toleranceCold = coldAvg;

        });
      });
    }

    this.navCtrl.pop();
  }

}
