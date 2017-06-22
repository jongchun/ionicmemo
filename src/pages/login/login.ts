import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

//import { TabsPage } from '../tabs/tabs';

import { AuthProvider } from '../../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth, private gp: GooglePlus, public lc: LoadingController,
              private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = this.lc.create({
      content: 'Logging in...',
      dismissOnPageChange: true
    });
    loader.present();

    this.auth.googleLogin().then(res => {
      console.log('Login', res);
      //loader.dismissAll();
      //this.navCtrl.setRoot(TabsPage);
    })
    .catch(error => {
      loader.dismissAll();
      console.log(error);
    });
    /*
    let loader = this.lc.create({
      content: 'Logging in...'
    });
    loader.present();

    if(this.platform.is('cordova')) {
      this.gp.login({
        'webClientId': '149608619485-ftinje9t83gu5pjt2ds2bqnua5jocjsk.apps.googleusercontent.com'
      }).then( res => {
        console.log(res);
        this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        loader.dismissAll();
        this.navCtrl.setRoot(TabsPage);
      }).catch(error => {
        console.log(error);
        loader.dismissAll();
      });
    }else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
        loader.dismissAll();
        this.navCtrl.setRoot(TabsPage);
      });
      
    }
    */
  }
}
