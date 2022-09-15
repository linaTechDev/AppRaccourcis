export interface Utilisateur {
  id: string;
  prenom: string;
  nomFamille: string;
  nomUtilisateur: string;
  motPasse: string;
}

export interface CurrentUser {
  token: string;
  prenom: string;
  nomFamille: string;
  nomUtilisateur: string;
}
