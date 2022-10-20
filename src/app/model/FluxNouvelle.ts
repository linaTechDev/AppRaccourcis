import {ActuInfo} from "./ActuInfo";

export class FluxNouvelle {
  id: number;
  nameSite: string;
  urlSite: string;
  nomUtilisateur: string;
  favIconUrl: string;
  favIconBase64: string;
  actusInfos: Array<ActuInfo>;
  nouveau: boolean;
  loaded: boolean;

  constructor(id: number, nameSite: string, urlSite: string, nomUtilisateur: string, favIconUrl: string, favIconBase64: string,
              actusInfos: Array<ActuInfo>, nouveau?: boolean) {
    this.id = id;
    this.nameSite = nameSite;
    this.urlSite = urlSite;
    this.nomUtilisateur = nomUtilisateur;
    this.favIconUrl = favIconUrl;
    this.favIconBase64 = favIconBase64;
    this.actusInfos = actusInfos;
    this.nouveau = (nouveau) ? nouveau : false;
    this.loaded = !this.nouveau;
  }
}
