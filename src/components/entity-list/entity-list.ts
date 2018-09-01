import {Component, Input} from '@angular/core';
import {DataProvider} from "../../providers/data/data";
import {AlertController, NavController, reorderArray} from "ionic-angular";
import {CharacterModel, CharacterPage} from "../../pages/character/character";

/**
 * Generated class for the EntityListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entity-list',
  templateUrl: 'entity-list.html'
})
export class EntityListComponent {

  @Input() listType: string;
  @Input() navCtrl: NavController;

  constructor(private data: DataProvider, private alertCtrl: AlertController) {
  }

  goToChar(char: CharacterModel) {
    this.navCtrl.push(CharacterPage, {character: char});
  }

  reorderItems(indexes) {
    this.data[this.listType] = reorderArray(this.data[this.listType], indexes);
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
    if (index > -1) {
      this.data[this.listType].splice(index, 1);
    }
  }
}
