import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {FirebaseProvider} from '../providers/firebase/firebase';

import {Camera} from '@ionic-native/camera'
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {CharacterPageModule} from "../pages/character/character.module";
import {EditCharPageModule} from "../pages/edit-char/edit-char.module";
import {MapsPageModule} from "../pages/maps/maps.module";
import { DataProvider } from '../providers/data/data';
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    CharacterPageModule,
    EditCharPageModule,
    MapsPageModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    DataProvider
  ]
})
export class AppModule {
}
