import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CommonModule } from '@angular/common';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OwnerProfilePage } from '../pages/owner/owner-profile/owner-profile';
import { UserProfilePage } from '../pages/user/user-profile/user-profile';
import { RegisterPage } from '../pages/register/register';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { SearchPage } from '../pages/user/search/search';
import { AdminPage } from '../pages/admin/admin';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { UserViewCarPage } from '../pages/user/user-view-car/user-view-car';
import { OwnerViewRequestPage } from '../pages/owner/owner-view-request/owner-view-request';
import { UserViewRequestPage } from '../pages/user/user-view-request/user-view-request';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { PlatNumberService } from './../services/car-list/plate-number.service';
import { CarListService } from './../services/car-list/car-list.service';
import { CarBookService } from './../services/car-list/car-book.service';
import { CarStatusService } from './../services/car-list/car-status.service';
import { OwnerDetailsService } from './../services/owner-details/owner-details.service';
import { ToastService } from './../services/toast/toast.service';


const FirebaseConfig = {
    apiKey: "AIzaSyBaIVtjt8SMQxL0C66_1HvipoDagOsdYNs",
    authDomain: "myapp-ba3d7.firebaseapp.com",
    databaseURL: "https://myapp-ba3d7.firebaseio.com",
    projectId: "myapp-ba3d7",
    storageBucket: "myapp-ba3d7.appspot.com",
    messagingSenderId: "769966606128"
  };

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    LoginPage,
    UserProfilePage,
    OwnerProfilePage,
    RegisterPage,
    SearchPage,
    ResetPasswordPage,
    AdminPage,
    CreateProfilePage,
    OwnerViewRequestPage,
    UserViewRequestPage
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    LoginPage,
    UserProfilePage,
    OwnerProfilePage,
    RegisterPage,
    SearchPage,
    RegisterPage,
    ResetPasswordPage,
    AdminPage,
    CreateProfilePage,
    OwnerViewRequestPage,
    UserViewRequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarListService,
    ToastService,
    OwnerDetailsService,
    PlatNumberService,
    CarBookService,
    CarStatusService,
  ]
})
export class AppModule {}
