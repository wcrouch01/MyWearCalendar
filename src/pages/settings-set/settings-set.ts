import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams) {
    this.notifications = true;
    this.gender = 1;
    this.colors = this.colors_Men;
    this.args = navParams.get('args');
    this.color = '270452214_2-s1';
    console.log("this is args", JSON.stringify(this.args));//.$link.fragment));


    console.log("this is snap", snap);
    console.log("this is init", snapKitInit);
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
           this.navCtrl.pop();
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
  if (buttonElement.classList.contains('color_' + color)) {
    buttonElement.classList.add('colorselected');
  }
}
}

setColor(color) {
console.log('Selected Color is', color);

}



}
