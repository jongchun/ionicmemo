import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { AuthProvider } from '../../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';

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
    })
    .catch(error => {
      loader.dismissAll();
      console.log(error);
    });
  }
}
