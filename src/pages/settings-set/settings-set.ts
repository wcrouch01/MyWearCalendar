import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';
import { HomePage } from '../home/home';

declare var snap;
declare var snapKitInit;

@Component({
  selector: 'page-settings-set',
  templateUrl: 'settings-set.html'
})
export class SettingsSetPage {

  gender: any;
  colors: any;
  colors_Men: Array<string> = ['270452214_2-s1', '270452208_2-s1','270452200_2-s1','270452176_2-s1','270452131_2-s1','270452117_2-s1','270452103_2-s1'];
  colors_Women: Array<string> = ['270452106_2-s1','270452105_2-s1','270452098_2-s1','270452091_2-s1','270452076_2-s1','270452062_2-s1','270452058_2-s1'];
  color: string;
  notifications: any;
  resp: any;
  args:any;
  link:any;
  route:any;

  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams,
    public global: MyglobalsProvider) {
    this.global.loadAll();
    this.notifications = navParams.get('notifications');
    this.gender = navParams.get('gender');
    this.color = navParams.get('color');
    this.args = navParams.get('args');

    console.log(this.notifications + "  " + this.gender + " " + this.color);

    if (this.notifications == undefined) {
      this.notifications = true;
    }
    if (this.gender == undefined) {
      this.gender = 1;
    }
    if (this.color == undefined) {
      this.color = '270452214_2-s1';
    }

    if (this.gender == 1) {
      this.colors = this.colors_Men;
    }
    else{
      this.colors = this.colors_Women;
    }

    console.log(this.notifications + "  " + this.gender + " " + this.color);
  }

  onChange(newValue) {
      console.log(newValue);
      if (newValue == 2) {
        this.colors = this.colors_Women;
        this.color = '270452106_2-s1';
        this.prepareColorSelector();
      }
      else{
        this.colors = this.colors_Men;
        this.color = '270452214_2-s1';
        this.prepareColorSelector();
      }
  }
  snapKitInit() {
    snapKitInit();
     }

submit(){

  /*this.args.fetchUserInfo()
    .then(data => {
      console.log("this is this.resp2 ", data);
      this.resp = data.data.me.bitmoji.avatar;
      console.log("this is this.resp2 resp ", this.resp);
    }).catch(err => console.log("this err: ",err.message));
*/
          this.storage.set('gender', this.gender);
          this.storage.set('color', this.color);
          this.storage.set('notifications', this.notifications);
          this.navCtrl.getPrevious().data.thing1 = this.color;
          this.navCtrl.getPrevious().data.gender = this.gender;
          this.navCtrl.getPrevious().data.notifications = this.notifications;
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);
          this.global.color = this.color;
          this.global.gender = this.gender;
           this.navCtrl.pop();
           //this.global.color = this.color;
}


  prepareColorSelector() {

      setTimeout(() => {
        let buttonElements = document.querySelectorAll('div.alert-radio-group button');
        if (!buttonElements.length) {
          this.prepareColorSelector();
        } else {
          for (let index = 0; index < buttonElements.length; index++) {
            let buttonElement = buttonElements[index];
            let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
            let color = optionLabelElement.innerHTML.trim();

            //if (this.isHexColor(color)) {
              buttonElement.classList.add('colorselect', 'color_' + color);
              //if (color == this.color) {
              //  buttonElement.classList.add('colorselected');
              //}
            //}
          }
        }
      }, 100);
}

/*isHexColor(color) {
    let hexColorRegEx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexColorRegEx.test(color);
}*/

selectColor(color) {
let buttonElements = document.querySelectorAll('div.alert-radio-group button.colorselect');
for (let index = 0; index < buttonElements.length; index++) {
  let buttonElement = buttonElements[index];
  buttonElement.classList.remove('colorselected');
  buttonElement.classList.remove('backgroundChange');
  if (buttonElement.classList.contains('color_' + color)) {
    buttonElement.classList.add('colorselected');
    buttonElement.classList.add('backgroundChange');
  }
}
}

setColor(color) {
console.log('Selected Color is', color);

}



}
