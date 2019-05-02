import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsSetPage } from '../pages/settings-set/settings-set';
import { Storage } from '@ionic/storage';
import { Slide } from '../pages/slide';
import { MyglobalsProvider } from '../providers/myglobals/myglobals';

declare var snap;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage:any = TabsPage;


  constructor( platform: Platform, private storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen,
    private deeplinks: Deeplinks, public global: MyglobalsProvider) {

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('gender').then((val) => {

        //if you havent opened the app yet
        if ( val == null) {
          this.nav.push(SettingsSetPage);
          this.nav.push(Slide);
        }
      });
    //  this.deeplinks.routeWithNavController(this.nav,{
    //    '/settings-set/:token': SettingsSetPage
    //  }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data

    //    this.nav.push(SettingsSetPage, {
    //      args: match
    //    });
    //    console.log('Successfully matched route', match.$args);
    //  },
    //  (nomatch) => {
        // nomatch.$link - the full link data
    //    console.error('Got a deeplink that didn\'t match', nomatch);
    //  });
    });

  }
}
