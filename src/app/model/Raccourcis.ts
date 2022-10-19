import {RaccourcisInfo} from "./RaccourcisInfo"

export class Raccourcis {
  id: number;
  nom: string;
  url: string;
  raccourcisInfo: RaccourcisInfo;
  nouveau: boolean;
  loaded: boolean;

  constructor(id: number, nom: string, url: string, raccourcisInfo: RaccourcisInfo, nouveau?: boolean) {
    this.id = id
    this.nom = nom;
    this.url = url;
    this.raccourcisInfo = raccourcisInfo;
    this.nouveau = (nouveau) ? nouveau : false;
    this.loaded = !this.nouveau;
  }
}
