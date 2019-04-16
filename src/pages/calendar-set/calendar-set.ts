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
    pre:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: MyglobalsProvider, 
    public toastController: ToastController, private storage: Storage) {
    this.from = navParams.get("from");
    this.to = navParams.get("to");
    this.ind = navParams.get("ind");
    this.global = global;
    this.pre = (this.from === undefined);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarSetPage');

    //set default 'car' checked
    if (this.pre){
      if (this.global.events[this.ind].pre_transport !== undefined){
        this.transport=this.global.events[this.ind].pre_transport;
      }else{
        this.transport='car';
      }
  
      if (this.global.events[this.ind].pre_time !== undefined){
        this.time=this.global.events[this.ind].pre_time;
      }else{
        this.time=5;
      }
    }else{
      if (this.global.events[this.ind].transport !== undefined){
        this.transport=this.global.events[this.ind].transport;
      }else{
        this.transport='car';
      }
  
      if (this.global.events[this.ind].time !== undefined){
        this.time=this.global.events[this.ind].time;
      }else{
        this.time=5;
      }
    }
  }

  ngOnInit(){
    console.log("hi");
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
    if (this.pre){
      this.storage.set("~"+this.to.replace(/\s/g, ""), {
        transport: this.transport,
        time: this.time
      });
    }else if (this.to === undefined){
      this.storage.set(this.from.replace(/\s/g, "")+"~", {
        transport: this.transport,
        time: this.time
      });
    }else{
      this.storage.set(this.from.replace(/\s/g, "")+"~"+this.to.replace(/\s/g, ""), {
        transport: this.transport,
        time: this.time
      });
    }
    
    //console.log("Writing transport/time to: "+this.from.replace(/\s/g, "")+"~"+this.to.replace(/\s/g, ""));
  }

  submit(){

    //validate and save

    console.log(this.transport + " "+this.time+" minutes")

    //if this is a pre_event
    if (this.pre){
      this.global.events[this.ind].pre_transport = this.transport;
      this.global.events[this.ind].pre_time = this.time;
    }else{
      this.global.events[this.ind].transport = this.transport;
      this.global.events[this.ind].time = this.time;
    }
    

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
