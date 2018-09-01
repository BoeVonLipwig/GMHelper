import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CharacterModel} from "../character/character";
import {FirebaseProvider} from "../../providers/firebase/firebase";

/**
 * Generated class for the EditCharPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-char',
  templateUrl: 'edit-char.html',
})
export class EditCharPage {
  newCharacter: CharacterModel;

  name: string;
  race: string;
  charClass: string = '';
  type: string;

  maxHitPoints: number = 2;

  // armorClass: number = 15;
  // stats: any = {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0};
  // weapon: string = '';
  // weaponDmg: string = '';
  // spell1Name: string = '';
  // spell1Dmg: string = '';
  // spell2Name: string = '';
  // spell2Dmg: string = '';
  // notes: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider, public toastCtrl: ToastController) {
    this.newCharacter = navParams.data.character;

    this.name = navParams.data.character.name;
    this.race = navParams.data.character.race;
    this.charClass = navParams.data.character.charClass;
    this.type = navParams.data.character.type;
    this.maxHitPoints = navParams.data.character.maxHitPoints;
  }

  save() {
    this.newCharacter.name = this.name;
    this.newCharacter.race = this.race;
    this.newCharacter.charClass = this.charClass;
    this.newCharacter.maxHitPoints = this.maxHitPoints;
    this.navCtrl.pop();
    const toast = this.toastCtrl.create({
      message: 'Character was saved successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  saveCloud() {
    this.firebase.send(this.name, this.charClass, this.maxHitPoints, this.race, this.type).then(console.log);
    this.newCharacter.name = this.name;
    this.newCharacter.race = this.race;
    this.newCharacter.charClass = this.charClass;
    this.newCharacter.maxHitPoints = this.maxHitPoints;
    const toast = this.toastCtrl.create({
      message: 'Character was saved to cloud successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
