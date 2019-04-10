import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingsSetPage } from '../settings-set/settings-set';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';

interface apiResponse {
    "@context": any,
    type: any,
    geometry: any,
    properties: any
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weatherLocal: any;
  hourlyReport: [any];
  level : string = "";
  gender: any;
  temperature: any;
  graphic: any;
  shortForecast: any;
  color: any;
  notifications: any;
  gradient:any;
  outfit: string;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HttpClient,
    private platform: Platform, public navParams: NavParams, private storage: Storage, public global: MyglobalsProvider) {

      this.gradient = "linear-gradient(#fffba4,#019dc5)";

    this.storage.get('gender').then((val) => {
    console.log('Your gender is', val);
    this.gender = val;
    if ( val == null) {
      this.navCtrl.push(SettingsSetPage);
    }
    });


    this.storage.get('color').then((val) => {
    this.color = val;
    this.setOutfit(this.color);
    //this.level = "https://render.bitstrips.com/render/10215854/" + this.color + "-v3.png?cropped=%22body%22&outfit=1018031&head_rotation=0&body_rotation=0&width=300";
    console.log('Your character is', this.outfit);
    });

  }

 ionViewWillEnter() {
   if (this.color == null) {
     this.color = this.navParams.get('thing1')|| null;
   }
   this.setOutfit(this.color);
 }

  setOutfit(val){
    if (this.level == "wear coat, bundle up"){
      if (this.gender == 1) { //women outfit
          this.outfit = "url('https://render.bitstrips.com/render/10215854/"+ val +"-v1.png?cropped=%22body%22&outfit=944137&head_rotation=0&body_rotation=0&width=300')"
      }
      else{
          this.outfit = "url('https://render.bitstrips.com/render/10215854/" + val + "-v3.png?cropped=%22body%22&outfit=1018031&head_rotation=0&body_rotation=0&width=300')"
      }
    }
    else if (this.level == "wear pants, light jacket"){
      if (this.gender == 1) {
          this.outfit = "url('https://render.bitstrips.com/render/10215854/"+ val +"-v1.png?cropped=%22body%22&outfit=957114&head_rotation=0&body_rotation=0&width=300')"
      }
      else{
          this.outfit = "url('https://render.bitstrips.com/render/10215854/" + val + "-v3.png?cropped=%22body%22&outfit=962366&head_rotation=0&body_rotation=0&width=300')"
      }
    }
    else{ //this.level = "shorts are good";
      if (this.gender == 1) {
          this.outfit = "url('https://render.bitstrips.com/render/10215854/"+ val +"-v1.png?cropped=%22body%22&outfit=889503&head_rotation=0&body_rotation=0&width=300')"
      }
      else{
          this.outfit = "url('https://render.bitstrips.com/render/10215854/" + val + "-v3.png?cropped=%22body%22&outfit=1017606&head_rotation=0&body_rotation=0&width=300')"
      }
      }
  }

  ionViewDidEnter(){

		this.platform.ready().then(() => {
			console.log("Device is ready! View did enter!");
			let options = {
				enableHighAccuracy: true,
				timeout: 100000,
        maximumAge: 0
			}
			this.geolocation.getCurrentPosition(options).then((resp) => {
				console.log("My position: " + resp.coords.latitude + ", " + resp.coords.longitude);

        //this.storage.set('lat', resp.coords.latitude);
        //this.storage.set('long', resp.coords.longitude);
        var apiCall = "https://api.weather.gov/points/"+resp.coords.latitude+","+resp.coords.longitude+"/forecast/hourly"
         //console.log(apiCall);
           this.http.get<apiResponse>(apiCall).subscribe((response) => {
            //console.log(response);
             this.hourlyReport = response.properties.periods;
             //console.log(response.properties.periods);
             this.weatherLocal = response.properties.periods[0].temperature;
             this.whatToWear();
          }, err => {
            this.weatherLocal = err;
        });

        var apiCall2 = "https://api.weather.gov/points/"+resp.coords.latitude+","+resp.coords.longitude+"/forecast"
         //console.log(apiCall);
           this.http.get<apiResponse>(apiCall2).subscribe((response) => {
            console.log("apiCall2" , response.properties.periods[0]);
             this.temperature = response.properties.periods[0].temperature;
             //console.log(response.properties.periods);
             this.shortForecast = response.properties.periods[0].shortForecast;

              if (this.shortForecast.includes("Thunder") || this.shortForecast.includes("thunder")) {
               this.graphic = "url('../../assets/icon/thunder.svg')";
               this.gradient = "linear-gradient(#76787b,#007bcb, #002856)";
             }else if (this.shortForecast.includes("Snow") || this.shortForecast.includes("snow")) {
                 this.graphic = "url('../../assets/icon/snowy-1.svg')";
                 this.gradient = "linear-gradient(#949598,#0060b5)";
             }else if (this.shortForecast.includes("Rain") || this.shortForecast.includes("rain")) {
                 this.graphic = "url('../../assets/icon/rainy-1.svg')";
                 this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
             }else if (this.shortForecast.includes("Cloud") || this.shortForecast.includes("cloud")) {
               this.graphic = "url('../../assets/icon/cloudy.svg')";
               this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
             }else{
               this.graphic = "url('../../assets/icon/cloudy-day-1.svg')";
               this.gradient = "linear-gradient(#fffba4,#019dc5)";
             }
             console.log(this.temperature + " , " + this.shortForecast);

          }, err => {
            this.weatherLocal = err;
        });

			}).catch((error) => {
				console.log("Error getting location Code: " + error.code + ", Message: " + error.message);
			});
		});

    //https://ionicframework.com/docs/v3/native/native-geocoder/ can be used to translate a string city to coordinates.

    //Design idea: on home use gradient as background for rhe item card (downloads/5829ee36918eb80664d5a09f.jpeg) and use gif or annimated icon to display weather conditions
    //to get weather conditions use the api call https://api.weather.gov/points/"+resp.coords.latitude+","+resp.coords.longitude+"/forecast
    //the response in periods[0].shortForecast we will get a string of weather conditions that should be used to determine graphic.

    //load events provider
    this.global.loadAll();
  }

  markLocation(){
    console.log("IN MARKLOCATION");
  }
/*
Inputs:

  CalItems[] items
    items[0].time (time of the event)
    items[0].transportation (walk, bus, car, etc)
    items[0].duration (15 minutes to get there)
  double toleranceCold
    value from 0-2 (quite important), ~40 cold
  double toleranceWarm
    value from 0-2, ~60 warm tolerance
  double[] temperatures
    temperatures for each hour of the day
  double[] rain
    % chance of rain for each hour of the day

  Outputs:

  int level
    0=wear a lot, 2=wear nothing
  boolean umbrella
    true=bring umbrella

  Internal Variables:

  int[] minOutside
    minutes spent outside (for each hour)
  int[] minLevel
    minutes outside during different "levels" of temperature

  Constant inputs:

  [Subject to change]
  int tempL1 = 39
  int tempL2 = 61
  CONSTANT int walkToCar = 3
    time we assume it takes to get to car
  CONSTANT int walkForBus = 6
    time we assume it takes to get to bus and dest
  CONSTANT int minColdNeedCoat = 4
  CONSTANT int minCoolNeedJacket = 10

  [Do we multiply constants by the "inverse" of the tolerance? Can people enter these constants in the settings?]


  Alg:
*/

  whatToWear() {
    console.log("IN WHAT TO WEAR()");

    //get events (including transportation) from calendar page (it is loaded)
    var events = this.global.events;

    //Find #min outside for each hour of the day
  //  for each hour of the day (h):
    //  for each cal item (x):
    //    if items[x].time between hour && hour+1:
    //      if rain[h] > 50%:
    //        umbrella = true
    //      if items [x].transportation is outside (walk/bike)
    //        minOutside[h] += items[x].duration
    //      else if items[x] is Bus/Subway
      //      minOutside[h] += walkToBus
      //    else (if items[x] is Car -- can just be else)
      //      minOutside[h] += walkToCar

    var tempL1 = 39;//*= toleranceCold
    var tempL2 = 61;//*= toleranceWarm
    var minColdNeedCoat = 4;
    var minCoolNeedJacket = 10;
    var minLevel1= 0;
    var minLevel2= 0;
    var minLevel3= 0;
    var minOutside= [1,1,1,1,1,1,1];
    var toleranceCold = 1;
    var toleranceWarm = 1;
    //Find #min outside at each temperature level
    for(var i=0;i<7;i++){
      //console.log("IN FOR LOOP()");
      //console.log(this.hourlyReport[i].temperature);
      if (this.hourlyReport[i].temperature < tempL1){
        minLevel1 += 1;//minOutside[i];
      }
      if(this.hourlyReport[i].temperature < tempL2){
        minLevel2 += 1;//minOutside[i];
      }
      else{
        minLevel3 += 1;
      }
    }
    //Calculate "level" based on minutes spent at each level, this is the secret sauce (maybe?)
    //This doesn't consider if time spent is continuous or not... Do we care?
    //console.log(minLevel1);
    //console.log(minLevel2);
    //console.log(minLevel3);
    if (minLevel1 > minColdNeedCoat * toleranceCold){
      this.level = "wear coat, bundle up";
    }
    else if (minLevel2 > minCoolNeedJacket * toleranceWarm){
      this.level = "wear pants, light jacket";
    }
    else{
      this.level = "shorts are good";
      }

      //console.log("THIS IS THE LEVEL  " +  this.level);
  }
}
