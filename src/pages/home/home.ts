import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HttpClient) {

    this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp.coords.latitude);
       console.log(resp.coords.longitude);
       var apiCall = "http://api.openweathermap.org/data/2.5/weather?lat="+resp.coords.latitude+"&lon="+resp.coords.longitude+"&APPID=664bfb683ddf553092f072ef0a65abcf"
       console.log(apiCall);
       this.http.get(apiCall).subscribe((response) => {
         console.log(response);
      });
      }).catch((error) => {
        console.log('Error getting location', error);
      });

  }

}
