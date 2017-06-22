import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailModalPage } from '../pages/detail-modal/detail-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GooglePlus } from '@ionic-native/google-plus';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

export const fireaseConfig = {
    apiKey: "<YOURS HERE>",
    authDomain: "<YOURS HERE>",
    databaseURL: "<YOURS HERE>",
    projectId: "<YOURS HERE>",
    storageBucket: "<YOURS HERE>",
    messagingSenderId: "<YOURS HERE>"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    DetailModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      }
    }
    ),
    AngularFireModule.initializeApp(fireaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    DetailModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    AuthProvider,
    Keyboard
  ]
})
export class AppModule {}
