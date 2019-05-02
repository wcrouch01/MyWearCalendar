import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'slide',
  template: `
    <ion-slides style="background:white;" pager="true">
      <ion-slide>
        <h1>Welcome to Wear Where</h1>
        <img style="height:200px;width:auto; border-radius: 20%;" src="../assets/icon/icon.png">
        <p style="max-width: 350px; padding: 10px; margin: auto;"> We are here to help you make an educated decision on what to wear. </p>
      </ion-slide>
      <ion-slide>
        <h1>How we do it</h1>
        <p style="max-width: 450px; padding: 10px; margin: auto;"> By compiling calendar, location, and preference information we make an accurate prediction on what style of clothes would most comfortably match the weather.</p>
        <img style="height: 200px;padding-right: 30px;" src="https://render.bitstrips.com/render/8794751/280531978_4-s1-v1.png?cropped=%22body%22&amp;outfit=1000649&amp;head_rotation=1&amp;body_rotation=1&amp;width=300">
        <img style="height: 200px;" src="https://render.bitstrips.com/render/10215853/121464857_22-s1-v3.png?cropped=%22body%22&amp;outfit=1018238&amp;head_rotation=7&amp;body_rotation=7&amp;width=300">
      </ion-slide>
      <ion-slide>
        <h1>Calendar</h1>
        <p style="max-width: 350px; padding: 10px; margin: auto;"> For us to make the most accurate prediction, go to the calendar tab and fill out the mode of transportation and amount of time you will be outside between each of your events in a day.
        <p style="max-width: 350px; padding: 10px; margin: auto;"> This information will be stored in case you have daily, weekly, or monthly recurring events.
      </ion-slide>
      <ion-slide>
        <h1>Feedback</h1>
        <p style="max-width: 350px; padding: 10px; margin: auto;"> This is an important part of our algorithm, to better understand your preference we need feedback for how comfortable you were in the suggested outfit.</p>
        <p style="max-width: 350px; padding: 10px; margin: auto;"> More feedback means a more accurate prediction!</p>
      </ion-slide>
      <ion-slide>
        <h1>Continue to Wear Where</h1>
        <button ion-button (click)="popIt()"> Continue </button>
      </ion-slide>
    </ion-slides>
  `
})
export class Slide {
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.

  constructor(public navCtrl: NavController) {}

  popIt(){
    this.navCtrl.pop();
  }

}
