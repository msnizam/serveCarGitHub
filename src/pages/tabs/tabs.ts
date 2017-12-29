import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Events } from 'ionic-angular';


import { LoginPage } from '../../pages/login/login';
import { UserLoginPage } from '../../pages/user-login/user-login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = UserLoginPage;

  hide : boolean= true ;
  highlight: boolean= true;

  constructor(public events: Events) {
    this.tab1Root = LoginPage;
    this.tab2Root = UserLoginPage;
    this.hide= true;

    events.subscribe('user:entered', ()=> {
      this.hideTab();
    });
    events.subscribe('user:reset', ()=> {
      this.showTab();
    });

    events.publish('user:reset');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  hideTab(){
    this.hide= false;
  }

  showTab(){
    this.hide= true;
  }
}
