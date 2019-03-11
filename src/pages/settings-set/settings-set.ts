import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings-set',
  templateUrl: 'settings-set.html'
})
export class SettingsSetPage {

  gender: any;
  colors: Array<string> = ['#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979', '#819595'];
  color: string = '#d435a2';
  notifications: any;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.notifications = true;
    this.gender = 1;
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

            if (this.isHexColor(color)) {
              buttonElement.classList.add('colorselect', 'color_' + color.slice(1, 7));
              if (color == this.color) {
                buttonElement.classList.add('colorselected');
              }
            }
          }
        }
      }, 100);
}

isHexColor(color) {
    let hexColorRegEx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexColorRegEx.test(color);
}

selectColor(color) {
let buttonElements = document.querySelectorAll('div.alert-radio-group button.colorselect');
for (let index = 0; index < buttonElements.length; index++) {
  let buttonElement = buttonElements[index];
  buttonElement.classList.remove('colorselected');
  if (buttonElement.classList.contains('color_' + color.slice(1, 7))) {
    buttonElement.classList.add('colorselected');
  }
}
}

setColor(color) {
console.log('Selected Color is', color);

}

submit(){

      this.storage.set('gender', this.gender);
      this.storage.set('color', this.color);
      this.storage.set('notifications', this.notifications);

      this.navCtrl.pop();
}

}
