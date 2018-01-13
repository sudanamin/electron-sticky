import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ExpComponent } from './exp-component/exp-component.component';
import { EmailComponent } from './email/email.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { SignupComponent } from './signup/signup.component';

import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ResetPasswordComponent } from './reset-password/reset-password.component';////////////
//import { AngularFireAuth } from 'angularfire2/auth';



var firebaseConfig = {
  apiKey: "AIzaSyBs3l827jDcOmniFPenLdYA9AqS2pNRPxE",
  authDomain: "angular-sticky.firebaseapp.com",
  databaseURL: "https://angular-sticky.firebaseio.com",
  projectId: "angular-sticky",
  storageBucket: "angular-sticky.appspot.com",
  messagingSenderId: "655107197844"
  }


@NgModule({
  declarations: [
    AppComponent,
    ExpComponent,
    EmailComponent,
    LoginComponent,
    MembersComponent,
    SignupComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule ,FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [ AuthGuard,AuthService ],
  bootstrap: [AppComponent],
  entryComponents: [ExpComponent]
})
export class AppModule { }
