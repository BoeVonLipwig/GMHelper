import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {EditCharPage} from "../edit-char/edit-char";
import {FirebaseProvider} from "../../providers/firebase/firebase";

/**
 * Generated class for the CharacterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-character',
  templateUrl: 'character.html',
})
export class CharacterPage {

  character: CharacterModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider, public toastCtrl: ToastController) {
    this.character = navParams.data.character;
  }

  setHitPoints(number: number) {
    if (this.character.curHitPoints + number > this.character.maxHitPoints || this.character.curHitPoints + number <= 0)
      return;

    this.character.curHitPoints += number;
  }

  editCharacter(character: CharacterModel) {
    console.log(character);
    this.navCtrl.push(EditCharPage, {character: character});
  }
  pushCloud() {
    this.firebase.send(this.character.name, this.character.charClass, this.character.maxHitPoints, this.character.race, this.character.type).then(console.log);
    const toast = this.toastCtrl.create({
      message: 'Character was saved to cloud successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

export class CharacterModel {
  maxHitPoints: number = 10;
  curHitPoints: number = 0;
  armorClass: number = 15;
  stats: any = {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0};
  weapon: string = '';
  weaponDmg: string = '';
  spell1Name: string = '';
  spell1Dmg: string = '';
  spell2Name: string = '';
  spell2Dmg: string = '';
  notes: string = '';


  constructor(public name: string, public race: string, public charClass: string, public type: string) {

  }

}
