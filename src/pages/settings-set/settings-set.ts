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
  colors: Array<string> = ['#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979', '#819595'];
  color: string = '#d435a2';
  notifications: any;
  resp: any;
  args:any;
  link:any;
  route:any;

  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams) {
    this.notifications = true;
    this.gender = 1;

    this.args = navParams.get('args');

    console.log("this is args", JSON.stringify(this.args));//.$link.fragment));


    console.log("this is snap", snap);
    console.log("this is init", snapKitInit);
  }


  snapKitInit() {
    snapKitInit();//.then(data => console.log("this is this.resp ", data))
  //  .catch(error => console.log(error.message));

      /*    var name;
          var bitM;
          var endData;
         var loginButtonIconId = 'my-login-button-target';
         // Mount Login Button
         console.log("sending to snap api");
          this.resp = snap.loginkit.mountButton(loginButtonIconId, {
            clientId: "d0106cc3-484e-4634-9e09-491fe6e198c2",
            redirectURI: "https:///google.com",
            scopeList: [
              "user.display_name",
              "user.bitmoji.avatar",
            ],
        handleResponseCallback: () => {
             snap.loginkit.fetchUserInfo().then(data => {
                 console.log('User info:')//, data)
                endData = data;
                  }).catch( error => { console.error(error) });
           },
         });
         console.log("this is resp: ", this.resp); */
     }

submit(){

  this.args.fetchUserInfo()
    .then(data => {
      console.log("this is this.resp2 ", data);
      this.resp = data.data.me.bitmoji.avatar;
      console.log("this is this.resp2 resp ", this.resp);
    }).catch(err => console.log("this err: ",err.message));
        //   this.storage.set('gender', this.gender);
        //   this.storage.set('color', this.color);
          // this.storage.set('notifications', this.notifications);
          // this.navCtrl.pop();
}
       // Load the SDK asynchronously
    /*   function (d, s, id) {
         var js, sjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = "https://sdk.snapkit.com/js/v1/login.js";
         sjs.parentNode.insertBefore(js, sjs);
       }(document, 'script', 'loginkit-sdk'));*/
/*
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


*/
}
