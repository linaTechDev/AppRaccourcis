import {RaccourcisInfo} from "./RaccourcisInfo"

export class Raccourcis {
  id: number;
  nameSite: string;
  urlSite: string;
  nomUtilisateur: string;
  raccourcisInfo: RaccourcisInfo;
  nouveau: boolean;
  loaded: boolean;

  constructor(id: number, nameSite: string, urlSite: string, nomUtilisateur: string, raccourcisInfo: RaccourcisInfo, nouveau?: boolean) {
    this.id = id;
    this.nameSite = nameSite;
    this.urlSite = urlSite;
    this.nomUtilisateur = nomUtilisateur;
    this.raccourcisInfo = raccourcisInfo;
    this.nouveau = (nouveau) ? nouveau : false;
    this.loaded = !this.nouveau;
  }
}
