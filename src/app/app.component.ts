import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsSetPage } from '../pages/settings-set/settings-set';

declare var snap;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage:any = TabsPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private deeplinks: Deeplinks) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.deeplinks.routeWithNavController(this.nav,{
        '/settings-set/:token': SettingsSetPage
      }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data

        this.nav.push(SettingsSetPage, {
          args: match
        });
        console.log('Successfully matched route', match.$args);
      },
      (nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    });

  }
}
