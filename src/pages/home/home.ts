import { Component } from '@angular/core';
import { NavController,  NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FeedbackPage } from '../feedback/feedback';
import { MyglobalsProvider } from '../../providers/myglobals/myglobals';
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { not } from '@angular/compiler/src/output/output_ast';

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
  levelInt: number;
  gender: any;
  temperature: any;
  graphic: any;
  shortForecast: any;
  shortForecastSplit: any;
  //color: any;
  notifications: any;
  gradient:any;
  gradientEnd:any;
  dropdown: boolean;
  newLoc: string;
  lastOpen: any;
  lastOpenStr: any;
  lastOpenLevel:number;
  totalTime:number;
  loading: any;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HttpClient,
    private platform: Platform, public navParams: NavParams, private storage: Storage, public loadingCtrl: LoadingController,
    public global: MyglobalsProvider, private nativeGeocoder: NativeGeocoder, public alertController: AlertController) {
      this.dropdown = false;
      this.gradient = "linear-gradient(#fffba4,#019dc5)";
      this.gradientEnd = "#019dc5";

    this.storage.get('gender').then((val) => {
      //console.log('Your gender is', val);
      this.global.gender = val;

      //if you havent opened the app yet
      if ( val == null) {

      }
    });

    //this.storage.get('color').then((val) => {
    //this.color = val;
    //this.setOutfit(val);
    //this.level = "https://render.bitstrips.com/render/10215854/" + this.color + "-v3.png?cropped=%22body%22&outfit=1018031&head_rotation=0&body_rotation=0&width=300";
    //console.log('Your character is', this.global.outfit);
    //});

    //save the last time this app has loaded

  }


    presentLoadingCustom() {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box">
               <img src="assets/icon/loading.gif" />
            </div>
          </div>`,
        duration: 3000,
        cssClass: 'my-loading-class'
      });

      this.loading.onDidDismiss(() => {
        console.log('Dismissed loading');
      });

      this.loading.present();
    }

    dismissLoading(){
        if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
      }

 ionViewWillEnter() {
  console.log("ionViewWillEnter");
  //load events provider
  this.global.loadAll();

 }

  setOutfit(val){
    console.log("this is the gender: ", this.global.gender);
    if (this.levelInt == 0){
      if (this.global.gender == 2) { //women outfit
          this.global.outfit = "url('https://render.bitstrips.com/render/10215854/"+ val +"-v1.png?cropped=%22body%22&outfit=944137&head_rotation=0&body_rotation=0&width=400')"
      }
      else{
          this.global.outfit = "url('https://render.bitstrips.com/render/10215854/" + val + "-v3.png?cropped=%22body%22&outfit=1018031&head_rotation=0&body_rotation=0&width=400')"
      }
    }
    else if (this.levelInt == 1){
      if (this.global.gender == 2) {
          this.global.outfit = "url('https://render.bitstrips.com/render/10215854/"+ val +"-v1.png?cropped=%22body%22&outfit=957114&head_rotation=0&body_rotation=0&width=400')"
      }
      else{
          this.global.outfit = "url('https://render.bitstrips.com/render/10215854/" + val + "-v3.png?cropped=%22body%22&outfit=962366&head_rotation=0&body_rotation=0&width=400')"
      }
    }
    else{ //this.levelInt = 2;
      if (this.global.gender == 2) {
          this.global.outfit = "url('https://render.bitstrips.com/render/10215854/"+ val +"-v1.png?cropped=%22body%22&outfit=889503&head_rotation=0&body_rotation=0&width=400')"
      }
      else{
          this.global.outfit = "url('https://render.bitstrips.com/render/10215854/" + val + "-v3.png?cropped=%22body%22&outfit=1017606&head_rotation=0&body_rotation=0&width=400')"
      }
      }
      console.log(this.global.outfit);
      this.dismissLoading();
  }

  ionViewDidEnter(){

    this.presentLoadingCustom();

    this.storage.get('color').then((val) => {
    this.global.color = val;
    if (val == null) {
      this.global.color = this.navParams.get('thing1')|| null;
    }
    console.log('Your character is ' + val + " and the gender " + this.global.gender + " global : " + this.global.color);
    this.setOutfit(this.global.color);
    });

    this.storage.get('gender').then((val) => {
      //console.log('Your gender is', val);
      this.global.gender = val;
    //  if (val == null) {
    //    this.global.gender = this.navParams.get('gender')|| null;
    //    this.setOutfit(this.global.color);
    //  }
    });


		this.platform.ready().then(() => {
			console.log("Device is ready! View did enter!");
      console.log(this.global.color);
			let options = {
				enableHighAccuracy: true,
				timeout: 100000,
        maximumAge: 0
			}
			this.geolocation.getCurrentPosition(options).then((resp) => {
				//console.log("My position: " + resp.coords.latitude + ", " + resp.coords.longitude);
        this.aipCall(resp.coords.latitude ,resp.coords.longitude);
        //this.storage.set('lat', resp.coords.latitude);
        //this.storage.set('long', resp.coords.longitude);

			}).catch((error) => {
				//console.log("Error getting location Code: " + error.code + ", Message: " + error.message);
			});
		});

    //https://ionicframework.com/docs/v3/native/native-geocoder/ can be used to translate a string city to coordinates.

    //Design idea: on home use gradient as background for rhe item card (downloads/5829ee36918eb80664d5a09f.jpeg) and use gif or annimated icon to display weather conditions
    //to get weather conditions use the api call https://api.weather.gov/points/"+resp.coords.latitude+","+resp.coords.longitude+"/forecast
    //the response in periods[0].shortForecast we will get a string of weather conditions that should be used to determine graphic.



    //ask for feedback if we have opened the app earlier and haven't given feedback
    this.storage.get("lastOpen").then((val) => {

      this.storage.get("lastOpenLevel").then((val) => {
        if ( val != null) {
          this.lastOpenLevel = parseInt(val);
        }else{
          this.lastOpenLevel = undefined;
        }
      });

      //if there is a lastOpen value
      if ( val != null) {
        this.lastOpen = new Date(val);
        var now = new Date();
        var diff = (Number(now) - this.lastOpen) / 3.6e6;
        //console.log("last open found: "+this.lastOpen+" or hours ago: "+diff);

        //calculate 'Monday', 'Today', 'Yesterday'
        this.lastOpenStr = this.days[ this.lastOpen.getDay() ];
        if (this.lastOpen.getDay() == now.getDay()){
          this.lastOpenStr = "Today";
        }else if (this.lastOpen.getDay() == now.getDay()-1){
          this.lastOpenStr = "Yesterday";
        }

        //see if the app has been opened in less than x hours
        if (diff > 1 && diff < 168){
          this.giveFeedbackAlert();
          this.saveCurrentOpen();
        }

        //if app has been opened in less than 1 hour, assume just checking the weather
        else if (diff >= 168){
          this.saveCurrentOpen();
        }

      }else{

        //store first 'lastOpen' value
        this.saveCurrentOpen();
        //console.log("Set lastOpen: "+(new Date()));
      }
    });

    //set the refresh icon to the end of the gradient color (so it will stand out)
    document.getElementById("ricon").style.color = this.gradientEnd;
  }

  markLocation(){
    //console.log("IN MARKLOCATION");
    this.dropdown = !this.dropdown;
  }

  setNewLocation(){
    //console.log("Set New Location", this.newLoc);
    this.presentLoadingCustom();
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.forwardGeocode(this.newLoc, options)
      .then((coordinates: NativeGeocoderForwardResult[]) => {
        //console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude)
        this.aipCall(coordinates[0].latitude, coordinates[0].longitude);
      })
      .catch((error: any) => console.log(error));

      this.newLoc = "";
      this.dropdown = false;
  }

  aipCall(lat,long){

    var apiCall = "https://api.weather.gov/points/"+ lat +","+ long +"/forecast/hourly"
     ////console.log(apiCall);
       this.http.get<apiResponse>(apiCall).subscribe((response) => {
        ////console.log("apiCall1",response);
         this.hourlyReport = response.properties.periods;
         ////console.log(response.properties.periods);
         this.weatherLocal = response.properties.periods[0].temperature;
         this.whatToWear();
      }, err => {
        this.weatherLocal = err;
    });

    var apiCall2 = "https://api.weather.gov/points/"+ lat +","+ long +"/forecast"
     ////console.log(apiCall);
       this.http.get<apiResponse>(apiCall2).subscribe((response) => {
        ////console.log("apiCall2" , response.properties.periods[0]);
         this.temperature = Math.max(response.properties.periods[0].temperature, response.properties.periods[1].temperature);
         ////console.log(response.properties.periods);

         //split on 'then'
         this.shortForecast = response.properties.periods[0].shortForecast;
         this.shortForecastSplit = response.properties.periods[0].shortForecast.split('then')[0].trim();

          if (this.shortForecastSplit.includes("Thunderstorms") || this.shortForecastSplit.includes("T-storms")) {
            this.graphic = "url('../../assets/icon/thunder.svg')";
            this.gradient = "linear-gradient(#76787b,#007bcb, #002856)";
            this.gradientEnd = "#002856";

           //document.getElementsByName("refresh")[0].style.color = "FFA500";
         }else if (this.shortForecastSplit.includes("Snow")) {
            this.graphic = "url('../../assets/icon/snowy-5.svg')";
            this.gradient = "linear-gradient(#949598,#0060b5)";
            this.gradientEnd = "#0060b5";

         }else if (this.shortForecastSplit.includes("Sleet")) {
            this.graphic = "url('../../assets/icon/rainy-7.svg')";
            this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
            this.gradientEnd = "#007aac";

         }else if (this.shortForecastSplit.includes("Rain")) {
            this.graphic = "url('../../assets/icon/rainy-3.svg')";
            this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
            this.gradientEnd = "#007aac";

         }else if (this.shortForecastSplit.includes("Fog")) {
            this.graphic = "url('../../assets/icon/cloudy.svg')";
            this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
            this.gradientEnd = "#007aac";

          }else if (this.shortForecastSplit.includes("Mostly Cloudy")) {
            this.graphic = "url('../../assets/icon/cloudy-day-3.svg')";
            this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
            this.gradientEnd = "#007aac";

         }else if (this.shortForecastSplit.includes("Cloudy")) {
           this.graphic = "url('../../assets/icon/cloudy.svg')";
           this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
           this.gradientEnd = "#007aac";

          }else if (this.shortForecastSplit.includes("Sunny")) {
            this.graphic = "url('../../assets/icon/day.svg')";
            this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
            this.gradientEnd = "#007aac";

          }else if (this.shortForecastSplit.includes("Clear")) {
            this.graphic = "url('../../assets/icon/day.svg')";
            this.gradient = "linear-gradient(#aea99d,#efdf92,#007aac)";
            this.gradientEnd = "#007aac";

         }else{
           this.graphic = "url('../../assets/icon/cloudy-day-3.svg')";
           this.gradient = "linear-gradient(#fffba4,#019dc5)";
           this.gradientEnd = "#019dc5";
         }
         //console.log(this.temperature + " , " + this.shortForecast);

      }, err => {
        this.weatherLocal = err;
    });

  }

  //called by HTML, pulls up page so the user can enter feedback with whitch we learn
  giveFeedback() {

    var now = new Date();
    ////console.log(this.lastOpen);

    //avoid error if this is undefined
    if (this.lastOpen === undefined){
      this.saveCurrentOpen();
      this.lastOpen = now;
      this.lastOpenLevel = this.levelInt;
    }

    this.lastOpenStr = this.days[ this.lastOpen.getDay() ];

    //get last open string
    if (this.lastOpen.getDay() == now.getDay()){
      this.lastOpenStr = "Today";
    }else if (this.lastOpen.getDay() == now.getDay()-1){
      this.lastOpenStr = "Yesterday";
    }

    //modify prefix depending on open string
    var prefix = 'on ';
    if (this.lastOpenStr == 'Today'){
        prefix = "earlier ";
    }else if (this.lastOpenStr == "Yesterday"){
        prefix = "";
    }

    //get level of wear
    var lol = "unknown";
    if (this.lastOpenLevel == 0){
      lol = "a coat";
    }else if (this.lastOpenLevel == 1){
      lol = "pants and light jacket";
    }else if (this.lastOpenLevel == 2){
      lol = "shorts";
    }
    //console.log("Last open level: "+this.lastOpenLevel);

    this.navCtrl.push(FeedbackPage, {
      lastOpen: this.lastOpen,
      lastOpenStr: prefix+this.lastOpenStr,
      lastOpenLevel: this.lastOpenLevel,
      lastOpenLevelStr: lol
    });

    //save current state as 'feedback'
    this.saveCurrentOpen();
  }

  async giveFeedbackAlert() {
    var prefix = 'on ';
    if (this.lastOpenStr == 'Today'){
        prefix = "earlier ";
    }else if (this.lastOpenStr == "Yesterday"){
        prefix = "";
    }

    const alert = await this.alertController.create({
      title: 'Provide Feedback?',
      subTitle: 'We noticed you haven\'t rated MyWearCalendar\'s accuracy after using the app '+prefix+this.lastOpenStr+'. \
      By providing feedback, you make predictions more accurate in the future.',
      buttons: [
        {
          text: 'No',
          role: 'no',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.giveFeedback();
          }
        }
      ]
    });

    await alert.present();
  }

  saveCurrentOpen(){
    this.storage.set('lastOpen', (new Date()));
    ////console.log("Saving lol of : "+this.levelInt);
    this.storage.set('lastOpenLevel', this.levelInt);
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
    //console.log("IN WHAT TO WEAR()");

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


    //CONSTANTS
    var tempL1 = 39;
    var tempL2 = 61;
    var minColdNeedCoat = 4;
    var minCoolNeedJacket = 10;

    //from storage (max of *2 tolerance)
    var toleranceCold = Math.min(this.global.toleranceCold, 2);
    var toleranceWarm = Math.min(this.global.toleranceWarm, 2);
    console.log("tolcold, tolwarm: "+toleranceCold+", "+toleranceWarm);

    //get these somehow (from UI or settings?)
    var defaultMinOutside:number = 5; //from settings?
    var numHours:number = 18; // the number of hours we want to look at

    //set hour array
    var minOutside:number[] = new Array(numHours);
    for(let h=0; h<numHours; h++){
      minOutside[h] = 0;
    }

    //get now, and the time when we are done (end)
    //let now = new Date();
    let end = new Date();
    let hrDate = new Date();
    let hrDatep1 = new Date();
    end.setHours( end.getHours() + numHours );
    hrDatep1.setHours( hrDatep1.getHours() + 1 );

    for(let h=0; h<numHours; h++){

      for(let i=0; i<events.length; i++){

        ////console.log("DOING: hour "+h);
        ////console.log("dtend: "+(new Date(events[i].dtend)) + " end "+end+" hrDate "+hrDate + " now "+now);
        ////console.log((new Date(events[i].dtend)) < end);
        ////console.log((new Date(events[i].dtend)) > hrDate);

        let eDate = new Date(events[i].dtend);

        //if event ends before the end of the range, and it ends after the current hour
        if (events[i].time !== undefined && eDate < end &&
            eDate > hrDate && eDate < hrDatep1){
          minOutside[h] += parseInt(events[i].time);
        }else if (eDate < end && eDate > hrDate && eDate < hrDatep1){
          minOutside[h] += defaultMinOutside;
        }

        //handle pre_event (i==0 only), use dtstart instead
        if (i == 0 && events[i].pre_time !== undefined && eDate < end &&
            eDate > hrDate && eDate < hrDatep1){
          minOutside[h] += parseInt(events[i].pre_time);
        }else if (i == 0 && eDate < end && eDate > hrDate && eDate < hrDatep1){
          minOutside[h] += defaultMinOutside;
        }


      }

      hrDate.setHours( hrDate.getHours() + 1);
      hrDatep1.setHours( hrDatep1.getHours() + 1 );
    }

    //console.log(minOutside);

    //adjust temps given the tolerance
    tempL1 *= toleranceCold;
    tempL2 *= toleranceWarm;
    console.log("new temp cold = "+tempL1);
    console.log("new temp warm = "+tempL2);

    //adjust if impossible range
    if (tempL1 > tempL2){
      tempL1 = tempL2;
    }

    //get number of minutes in each temperature range
    var minLevel1:number= 0;
    var minLevel2:number= 0;
    var minLevel3:number= 0;

    //Find #min outside at each temperature level
    for(let h=0; h<numHours; h++){

      //good line to uncomment for debugging alg
      ////console.log("Hour " +h+" temp "+this.hourlyReport[h].temperature + " min outside "+minOutside[h]);

      if (this.hourlyReport[h].temperature < tempL1){
        minLevel1 += minOutside[h];
      }
      else if (this.hourlyReport[h].temperature < tempL2){
        minLevel2 += minOutside[h];
      }
      else {
        minLevel3 += minOutside[h];
      }
    }

    //calculate total time outside
    this.totalTime = minLevel1 + minLevel2 + minLevel3;

    //Calculate "level" based on minutes spent at each level, this is the secret sauce (maybe?)
    //This doesn't consider if time spent is continuous or not... Do we care?
    console.log("LEVEL 1-3 minutes:");
    console.log(minLevel1);
    console.log(minLevel2);
    console.log(minLevel3);
    //should we adjust by tolerance? We are already factoring this once
    if (minLevel1 > minColdNeedCoat / toleranceCold){
      this.level = "Wear a coat, bundle up";
      this.levelInt = 0;
    }
    else if (minLevel2 > minCoolNeedJacket / toleranceWarm){
      this.level = "Wear pants and/or a jacket";
      this.levelInt = 1;
    }
    else{
      this.level = "Wearing shorts is okay";
      this.levelInt = 2;
    }

    console.log("THIS IS THE LEVEL  " +  this.level + " with this char: " + this.global.color);

    //set outfit
    this.setOutfit(this.global.color);
  }
}
