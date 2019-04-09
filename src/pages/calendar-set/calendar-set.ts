import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: MyglobalsProvider, 
    public toastController: ToastController, private storage: Storage) {
    this.from = navParams.get("from");
    this.to = navParams.get("to");
    this.ind = navParams.get("ind");
    this.global = global;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarSetPage');

    
  }

  //set default 'car' checked
  ngOnInit() {
    if (this.global.events[this.ind].transport !== undefined){
      this.transport=this.global.events[this.ind].transport;
    }else{
      this.transport='Car';
    }

    if (this.global.events[this.ind].time !== undefined){
      this.time=this.global.events[this.ind].time;
    }else{
      this.time=5;
    }
    
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  //save (no whitespace) from-to with transportation method and time outside
  saveEvent(){
    this.storage.set(this.from.replace(/\s/g, "")+"~"+this.to.replace(/\s/g, ""), {
      transport: this.transport,
      time: this.time
    });
    console.log("Writing transport/time to: "+this.from.replace(/\s/g, "")+"~"+this.to.replace(/\s/g, ""));
  }

  submit(){

    //validate and save

    console.log(this.transport + " "+this.time+" minutes")
    this.global.events[this.ind].transport = this.transport;
    this.global.events[this.ind].time = this.time;

    if (this.time === undefined || parseInt(this.time) > 1440){
      this.presentToast('Time between events too large. Must be less than a day.');
      return;
    }

    if (this.transport === undefined){
      this.presentToast('Please select a method of transportation.');
      return;
    }

    //make async method that saves things to your device
    this.saveEvent();

    this.navCtrl.pop();
  }

}
