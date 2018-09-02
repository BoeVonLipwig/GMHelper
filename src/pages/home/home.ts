import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {CharacterModel} from "../character/character";
import {ToastController} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  tab: string = 'players';

  constructor(public navCtrl: NavController, public data: DataProvider, public alertCtrl: AlertController, private camera: Camera, public firebase: FirebaseProvider, public toastCtrl: ToastController, private androidPermissions: AndroidPermissions) {
  }

  addCharacter() {
    let prompt = this.alertCtrl.create({
      title: 'Add Character',
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

  addItem(data) {
    this.data[this.tab].push(new CharacterModel(data.name, data.race, data.charClass, this.tab));
    const toast = this.toastCtrl.create({
      message: 'Character was saved successfully.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

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

  getImage(name: string) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.camera.getPicture(options).then((imageData) => {
      this.data.maps.push({img: 'data:image/jpeg;base64,' + imageData, name: name});
    });
  }

  loadCloud() {
    const toast = this.toastCtrl.create({
      message: 'Loading... may take a second',
      duration: 800,
      position: 'middle'
    });
    toast.present();
    let alert = this.alertCtrl.create();
    alert.setTitle('Download a pre-made character');

    this.firebase.getAll(this.tab).then((value: any[]) => {
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
          data.forEach(i => this.pullChar(i, this.tab))

        }
      });

      alert.present();
    });
  }

  pullChar(name: string, type: string) {
    this.firebase.get(name, type).then(char => {
      this.data[this.tab].push(new CharacterModel(name, char.race, char.charClass, type));
    });

    const toast = this.toastCtrl.create({
      message: 'Character was downloaded successfully.',
      duration: 2000,
      position: 'top'
    });
    toast.present();

  }

}
