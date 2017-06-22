import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';

import { DetailModalPage } from '../detail-modal/detail-modal'
import { AuthProvider } from '../../providers/auth/auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  memos: FirebaseListObservable<any[]>;
  userProfile: any = {};

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public modalCtrl: ModalController,
              private alertCtrl: AlertController, public afDB: AngularFireDatabase, private auth: AuthProvider) {

  }

  ionViewDidLoad() {
    this.userProfile = this.auth.getUserProfile();
    this.memos = this.afDB.list('/Memos/' + this.userProfile['uid'] + '/Works', {
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
    let params = { type: 'Works', title: title};
    let modal = this.modalCtrl.create(DetailModalPage, params);
    modal.present();
  }

  editMemo(memo) {
    let params = { type: 'Works', memo: memo, edit: true };
    let modal = this.modalCtrl.create(DetailModalPage, params);
    modal.present();
  }

  delete(memo: any) {
    this.memos.remove(memo);
  }

}
