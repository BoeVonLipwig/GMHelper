import {Component, Input} from '@angular/core';
import {DataProvider} from "../../providers/data/data";
import {MapsPage} from "../../pages/maps/maps";
import {NavController} from "ionic-angular";

/**
 * Generated class for the MapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent {

  text: string;
  @Input() navCtrl : NavController;

  constructor(private data: DataProvider) {
    console.log('Hello MapsComponent Component');
    this.text = 'Hello World';
  }

  goToMap(map: any) {
    this.navCtrl.push(MapsPage, {map: map});
  }


}
