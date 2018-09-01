import {Component} from '@angular/core';
import {NavController, reorderArray, AlertController} from 'ionic-angular';
import {CharacterModel, CharacterPage} from "../character/character";
import {MapsPage} from "../maps/maps";
import {ToastController} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {AndroidPermissions} from "@ionic-native/android-permissions";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  tab: string = 'playerCharacters';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private camera: Camera, public firebase: FirebaseProvider, public toastCtrl: ToastController, private androidPermissions: AndroidPermissions
  ) {
    this.maps = [];
    this.players = [];
    this.npcs = [];
    this.mobs = [];
  }

  maps: any[];
  players: CharacterModel[];
  npcs: CharacterModel[];
  mobs: CharacterModel[];


  addCharacter() {
    let prompt = this.alertCtrl.create({
      title: 'Add Player',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }, {
        name: 'race',
        placeholder: 'Race'
      }, {
        name: 'charClass',
        placeholder: 'Class'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Add',
        handler: data => {
          this.addItem(data);
        }
      }
      ]
    });

    prompt.present();
  }

  add() {
    if (this.tab == 'maps') {
      this.addMap();
    } else {
      this.addCharacter();
    }
  }

  getImage(name: string) {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.maps.push({img: 'data:image/jpeg;base64,' + imageData, name: name});
    }, (err) => {
      // Handle error
    });
  }

  images: any[];

  addMap() {
    let prompt = this.alertCtrl.create({
      title: 'Add Map',
      inputs: [{
        name: 'name',
        placeholder: 'Image name'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Add',
        handler: data => {
          this.getImage(data.name);
        }
      }
      ]
    });

    prompt.present();
  }

  addItem(data) {
    if (this.tab == 'playerCharacters') {
      this.players.push(new CharacterModel(data.name, data.race, data.charClass, 'players'));
    } else if (this.tab == 'NPCs') {
      this.npcs.push(new CharacterModel(data.name, data.race, data.charClass, 'npcs'));
    } else if (this.tab == 'mobs') {
      this.mobs.push(new CharacterModel(data.name, data.race, data.charClass, 'mobs'));
    }
    const toast = this.toastCtrl.create({
      message: 'Character was saved successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  reorderItems(indexes) {
    if (this.tab == 'playerCharacters')
      this.players = reorderArray(this.players, indexes);
    if (this.tab == 'NPCs')
      this.npcs = reorderArray(this.npcs, indexes);
    if (this.tab == 'mobs')
      this.mobs = reorderArray(this.mobs, indexes);
    if (this.tab == 'maps')
      this.maps = reorderArray(this.maps, indexes);
  }

  checkDelete(index) {
    let prompt = this.alertCtrl.create({
      title: 'Are you sure you want to delete this?',
      inputs: [],
      buttons: [{
        text: 'Yes',
        handler: name => {
          this.deleteItem(index);
        }
      }, {
        text: 'No'
      }]
    });

    prompt.present();
  }

  deleteItem(index) {
    if (this.tab == 'playerCharacters') {
      if (index > -1) {
        this.players.splice(index, 1);
      }
    }
    if (this.tab == 'NPCs') {
      if (index > -1) {
        this.npcs.splice(index, 1);
      }
    }
    if (this.tab == 'mobs') {
      if (index > -1) {
        this.mobs.splice(index, 1);
      }
    }
    if (this.tab == 'maps') {
      if (index > -1) {
        this.maps.splice(index, 1);
      }
    }
  }

  goToChar(char: CharacterModel) {
    this.navCtrl.push(CharacterPage, {character: char});
  }

  goToMap(map: any) {
    this.navCtrl.push(MapsPage, {map: map});
  }

  emptyMaps() {
    return this.maps.length == 0;
  }

  loadCloud() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Download a pre-made character');
    let type: string;

    if (this.tab == 'playerCharacters')
      type = 'players';
    else if (this.tab == 'NPCs')
      type = 'npcs';
    else if (this.tab == 'mobs')
      type = 'mobs';

    this.firebase.getAll(type).then((value: any[]) => {
      for (let i = 0; i < value.length; i++) {
        alert.addInput({
          type: 'checkbox',
          label: value[i],
          value: value[i]
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Ok',
        handler: (data) => {
          if (!data)
            return;
          data.forEach(i => this.pullChar(i, type))

        }
      });

      alert.present();
    });
  }

  pullChar(name: string, type: string) {
    this.firebase.get(name, type).then(char => {
      switch (type) {
        case 'players':
          this.players.push(new CharacterModel(name, char.race, char.charClass, type));
          break;
        case 'npcs':
          this.npcs.push(new CharacterModel(name, char.race, char.charClass, type));
          break;
        case 'mobs':
          this.mobs.push(new CharacterModel(name, char.race, char.charClass, type));
          break;
      }
    });

    const toast = this.toastCtrl.create({
      message: 'Character was downloaded successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

  fake() {
    this.addMap();
    // let alert = this.alertCtrl.create();
    // alert.setTitle('Sorry')
    // alert.setMessage('Adding maps does not yet work as I could not find any way to add image from a device that worked for ionic 3 in the time I had.');
    // alert.addButton('Ok');
    // alert.present();
  }
}
