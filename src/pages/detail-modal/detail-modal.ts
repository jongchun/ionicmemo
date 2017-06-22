import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-detail-modal',
  templateUrl: 'detail-modal.html',
})
export class DetailModalPage {
  memos: FirebaseListObservable<any[]>;
  memoID: string = '';
  title: any = '';
  contents: any = '';
  type: any = '';
  isEditable: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public afDB: AngularFireDatabase, private auth: AuthProvider) {

    this.type = this.navParams.get('type');
    let userProfile = auth.getUserProfile();
    this.memos = afDB.list('/Memos/' + userProfile['uid'] + '/' + this.type);

    if(this.navParams.get('edit')) {
      let memo = this.navParams.get('memo');
      this.memoID = memo.$key;
      this.title = memo.title;
      this.contents = memo.contents;
      this.isEditable = true;
    }else {
      this.title = this.navParams.get('title');
    }
  }

  ionViewDidLoad() {
  }

  save() {
    if(this.isEditable) {
      this.memos.update(this.memoID, {
        title: this.title,
        contents: this.contents,
        lastUpdate: -1 * new Date().getTime()
      });
    }else {
      this.memos.push({
        title: this.title,
        contents: this.contents,
        lastUpdate:  -1 * new Date().getTime()
      });
    }
    this.close();
  }

  close() {
    this.viewCtrl.dismiss(this.contents);
  }
}
