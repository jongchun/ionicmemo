import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';

import { DetailModalPage } from '../detail-modal/detail-modal'
import { AuthProvider } from '../../providers/auth/auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  memos: FirebaseListObservable<any[]>;
  userProfile = {};

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public modalCtrl: ModalController,
              private alertCtrl: AlertController, public afDB: AngularFireDatabase, private auth: AuthProvider) {
/*    this.zone = new NgZone({});
    afAuth.auth.onAuthStateChanged(user =>{
      this.zone.run(() => {
        if(user) {
          console.log(user);
          this.userProfile = user;
        }else {
          this.userProfile = null;
        }
      });
    });*/
  }

  ionViewDidLoad() {
    this.userProfile = this.auth.getUserProfile();
    this.memos = this.afDB.list('/Memos/' + this.userProfile['uid'] + '/Personal', {
      query: {
        orderByChild: "lastUpdate"
      }
    });
  }

  add() {
    let alert = this.alertCtrl.create({
      title: 'Create Memo',
      message: 'Please input the title',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if(data.title != '') {
              //console.log('New Title', data.title);
              this.newMemo(data.title);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
    });
    alert.present();
  }

  newMemo(title: string) {
    let params = { type: 'Personal', title: title};
    let modal = this.modalCtrl.create(DetailModalPage, params);
    modal.present();
  }

  editMemo(memo) {
    let params = { type: 'Personal', memo: memo, edit: true };
    let modal = this.modalCtrl.create(DetailModalPage, params);
    modal.present();
  }

  delete(memo: any) {
    this.memos.remove(memo);
  }

}
