import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { SearchPage } from '../pages/user/search/search';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { OwnerViewRequestPage } from '../pages/owner/owner-view-request/owner-view-request';
import { UserViewRequestPage } from '../pages/user/user-view-request/user-view-request';
import { UserViewBookRequestPage } from '../pages/user/user-view-book-request/user-view-book-request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pagesO: Array<{title: string, component: any}>;
  pagesU: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public menuCtrl: MenuController, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pagesO = [
      { title: 'Search', component: SearchPage },
      { title: 'User Request', component: OwnerViewRequestPage }
    ];

    this.pagesU = [
      { title: 'Search', component: SearchPage },
      { title: 'Car Book Result', component: UserViewRequestPage },
      { title: 'Car Booking', component: UserViewBookRequestPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }

}
