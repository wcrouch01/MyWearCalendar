import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import {Platform} from 'ionic-angular';

interface apiResponse {
    coord: any,
    sys: any,
    weather: any,
    main: any,
    wind: any,
    rain: any,
    clouds: any,
    dt: number,
    id: number,
    name: string,
    cod: number
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 weatherLocal: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HttpClient, private platform: Platform) {
/*
    var options = {
      enableHighAccuracy: true,
      timeout: 5000
    };

   this.platform.ready().then(() => {
        console.log("PLATFORM READY IN PROVIDER")

                this.geolocation.getCurrentPosition().then((resp) => {
                   console.log(resp.coords.latitude);
                   console.log(resp.coords.longitude);
                  // var apiCall = "http://api.openweathermap.org/data/2.5/weather?lat="+resp.coords.latitude+"&lon="+resp.coords.longitude+"&APPID=664bfb683ddf553092f072ef0a65abcf"
                  // console.log(apiCall);
                  //   this.http.get<apiResponse>(apiCall).subscribe((response) => {
                  //     console.log(response);

                  //     this.weatherLocal = response.main.temp - 273.15;
                  //  }, err => {
                //  this.weatherLocal = err;
                //  });
                  }).catch((error) => {
                    console.log('Error getting location', error.message);
                  });
    })
      */



  }

  ionViewDidEnter(){
		this.platform.ready().then(() => {
			console.log("Device is ready! View did enter!");
			let options = {
				enableHighAccuracy: true,
				timeout: 10000,
        maximumAge: 0
			}
			this.geolocation.getCurrentPosition(options).then((resp) => {
				console.log("My position: " + resp.coords.latitude + ", " + resp.coords.longitude);
        var apiCall = "http://api.openweathermap.org/data/2.5/weather?lat="+resp.coords.latitude+"&lon="+resp.coords.longitude+"&APPID=664bfb683ddf553092f072ef0a65abcf"
         console.log(apiCall);
           this.http.get<apiResponse>(apiCall).subscribe((response) => {
            console.log(response);

             this.weatherLocal = Math.round(response.main.temp - 273.15);
          }, err => {
            this.weatherLocal = err;
        });
			}).catch((error) => {
				console.log("Error getting location Code: " + error.code + ", Message: " + error.message);
			});
		});
	}

}
