import {ActuInfo} from "./ActuInfo";

export class FluxNouvelle {
  id: number;
  nom: string;
  url: string;
  nomUtilisateur: string;
  favIconUrl: string;
  favIconBase64: string;
  actusInfos: Array<ActuInfo>;
  nouveau: boolean;
  loaded: boolean;

  constructor(id: number, nom: string, url: string, favIconUrl: string, favIconBase64: string,
              actusInfos: Array<ActuInfo>, nouveau?: boolean, nomUtilisateur?: string) {
    this.id = id;
    this.nom = nom;
    this.url = url;
    this.favIconUrl = favIconUrl;
    this.favIconBase64 = favIconBase64;
    this.actusInfos = actusInfos;
    this.nouveau = (nouveau) ? nouveau : false;
    this.loaded = !this.nouveau;
    this.nomUtilisateur = (nomUtilisateur) ? nomUtilisateur: "";
  }
}
