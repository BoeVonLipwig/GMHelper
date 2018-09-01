import { Injectable } from '@angular/core';
import {CharacterModel} from "../../pages/character/character";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor() {
    this.maps = [];
    this.players = [];
    this.npcs = [];
    this.mobs = [];
  }
  maps: any[];
  players: CharacterModel[];
  npcs: CharacterModel[];
  mobs: CharacterModel[];


}
