import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
              private auth: AuthProvider, private keyboard: Keyboard) {
    /*                
    const authObserver = afAuth.authState.subscribe( user => {
      if(user) {
        console.log('app',user);
        this.auth.setUserProfile(user);
        this.rootPage = TabsPage;
        //authObserver.unsubscribe();
      }else {
        this.rootPage = LoginPage;
        //authObserver.unsubscribe();
      }
    });
    */
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if(platform.is('ios')) {
        this.keyboard.disableScroll(true);
      }

      /*const authObserver = */afAuth.authState.subscribe( user => {
        if(user) {
          console.log('app',user);
          this.auth.setUserProfile(user);
          this.rootPage = TabsPage;
          //authObserver.unsubscribe();
        }else {
          this.rootPage = LoginPage;
          //authObserver.unsubscribe();
        }
      });
    });
  }
}
