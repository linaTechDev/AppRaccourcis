import {RaccourcisInfo} from "./RaccourcisInfo"

export class Raccourcis {
  nom: string;
  url: string;
  raccourcisInfo: RaccourcisInfo;

  constructor(nom: string, url: string, raccourcisInfo: RaccourcisInfo) {
    this.nom = nom;
    this.url = url;
    this.raccourcisInfo = raccourcisInfo;
  }
}
