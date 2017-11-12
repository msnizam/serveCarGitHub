import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CommonModule } from '@angular/common';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { SearchPage } from '../pages/search/search';
import { RegisterCarPage } from '../pages/register-car/register-car';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthorizeProvider } from '../providers/authorize/authorize';


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
    ProfilePage,
    RegisterPage,
    SearchPage,
    RegisterCarPage
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
    ProfilePage,
    RegisterPage,
    SearchPage,
    RegisterPage,
    RegisterCarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthorizeProvider,
  ]
})
export class AppModule {}
