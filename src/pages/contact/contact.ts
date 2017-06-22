import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { AngularFireAuth } from 'angularfire2/auth';

import { AuthProvider } from '../../providers/auth/auth';
//import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  userProfile: any = null;
  zone: NgZone;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private gp: GooglePlus,
              private auth: AuthProvider) {
    this.zone = new NgZone({});
    afAuth.auth.onAuthStateChanged(user =>{
      this.zone.run(() => {
        if(user) {
          //console.log(user);
          this.userProfile = user;
        }else {
          this.userProfile = null;
        }
      });
    });
  }

  logout() {
    this.auth.logout();
    //this.navCtrl.setRoot(LoginPage);
  }

}
