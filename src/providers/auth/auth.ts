import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
  userProfile = {};

  constructor(private platform: Platform, public afAuth: AngularFireAuth,
              private gp: GooglePlus) {
  }

  googleLogin(): firebase.Promise<any> {
    if(this.platform.is('cordova')) {
      this.gp.login({
        'webClientId': '149608619485-ftinje9t83gu5pjt2ds2bqnua5jocjsk.apps.googleusercontent.com'
      }).then( res => {
        console.log('device', res);
        return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));

      }).catch(error => {
        console.log(error);
        return error;
      });
    }else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  logout() {
    if(this.platform.is('cordova')) {
      this.gp.logout();
    }
    this.afAuth.auth.signOut();
  }

  setUserProfile(user: any) {
    this.userProfile = {
      'displayName': user.displayName,
      'email': user.email,
      'photoURL': user.photoURL,
      'uid': user.uid
    };
    console.log('userProfile', this.userProfile);
  }
  getUserProfile(): any {
    return this.userProfile
  }

}
