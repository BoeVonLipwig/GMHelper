import {Injectable} from '@angular/core';
import * as fireBaseAPI from 'firebase';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor() {
    const config = {
      apiKey: "AIzaSyAHNcGmFJEw_ZlC8hucyHy1y59oZJKXGe8",
      authDomain: "dm-helper-a16c6.firebaseapp.com",
      databaseURL: "https://dm-helper-a16c6.firebaseio.com",
      projectId: "dm-helper-a16c6",
      storageBucket: "dm-helper-a16c6.appspot.com",
      messagingSenderId: "9797688485"
    };
    fireBaseAPI.initializeApp(config);

  }

  public send(name: string, charClass: string, maxHitPoints: number, race: string, type: string) {
    return fireBaseAPI.firestore().doc(type + '/' + name).set({
      charClass: charClass,
      maxHitPoints: maxHitPoints,
      race: race
    });
  }

  public async get(name: string, type: string): Promise<any> {
    return Promise.resolve((await fireBaseAPI.firestore().doc(type + '/' + name).get()).data());
  }

  public async getAll(type:string): Promise<any> {
    console.log(type);
    let list = await fireBaseAPI.firestore().collection(type).get();
    let names = [];
    list.forEach(dbItem => {
      names.push(dbItem.id)
    });
    return Promise.resolve(names);
  }

}
