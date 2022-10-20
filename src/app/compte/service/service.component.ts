import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Utilisateur} from "../../model/Utilisateur";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Raccourcis} from "../../model/Raccourcis";
import {FluxNouvelle} from "../../model/FluxNouvelle";


@Injectable({ providedIn: 'root' })
export class ServiceComponent {

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
  }

  isConnected(): Boolean {
    let jsonCurrentUser = localStorage.getItem('currentUser');
    if (jsonCurrentUser) {
      let currentUser = JSON.parse(jsonCurrentUser);

      if (this.jwtHelper.isTokenExpired(currentUser.token)) {
        localStorage.removeItem('currentUser');
      } else {
        return true;
      }
    }
    return false;
  }

  getConnectedUtilisateur(): string {
    let jsonCurrentUser = localStorage.getItem('currentUser');
    if (jsonCurrentUser) {
      let currentUser = JSON.parse(jsonCurrentUser);
      return currentUser.nomUtilisateur;
    }
    else {
      return "";
    }
  }

  tokenUtilisateur(): String {
    let jsonCurrentUser = localStorage.getItem('currentUser');
    if (jsonCurrentUser) {
      let currentUser = JSON.parse(jsonCurrentUser);

      if (this.jwtHelper.isTokenExpired(currentUser.token)) {
        localStorage.removeItem('currentUser');
        return "";
      } else {
        return currentUser.token;
      }
    }
    return "";
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/compte/connexion']).then(() => "Erreur");
  }

  NomPrenom(): String {
    let jsonCurrentUser = localStorage.getItem('currentUser');
    if (jsonCurrentUser) {
      let currentUser = JSON.parse(jsonCurrentUser);
      return currentUser.prenom + " " + currentUser.nomFamille;
    }
    return "";
  }

  creation(user: Utilisateur) {
    console.log(`${environment.apiUrl}/utilisateur/creation`);

    let jSonUser:string = JSON.stringify(user);
    console.log(jSonUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/utilisateur/creation`, jSonUser, httpOptions);
  }

  connexion(user: Utilisateur) {
    console.log(`${environment.apiUrl}/utilisateur/connexion`);

    let jSonUser:string = JSON.stringify(user);
    console.log(jSonUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/utilisateur/connexion`, jSonUser, httpOptions);
  }



  getRaccourcisInfo(raccourcisUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/previewRaccourcis`, raccourcisUrl, httpOptions);
  }

  saveRaccourcis(raccourcis: Raccourcis) {

    let jSonRaccourcis:string = JSON.stringify(raccourcis);
    console.log("json save rac ", jSonRaccourcis);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/raccourcis`, jSonRaccourcis, httpOptions);
  }

  getRaccourcis() {
    const nomUtilisateur = this.getConnectedUtilisateur();
    return this.http.get(`${environment.apiUrl}/raccourcis/`+nomUtilisateur);
  }

  updateRaccourcis(raccourcis: Raccourcis) {

    let jSonRaccourcis:string = JSON.stringify(raccourcis);
    console.log(jSonRaccourcis);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };

    return this.http.put(`${environment.apiUrl}/raccourcis/`+raccourcis.id.toString(), jSonRaccourcis, httpOptions);
  }

  deleteRaccourcis(raccourcis: Raccourcis) {
    console.log("service delete raccourcis ", raccourcis);
    const url = `${environment.apiUrl}/raccourcis/`+raccourcis.id.toString();
    console.log(url);
    return this.http.delete(`${environment.apiUrl}/raccourcis/`+raccourcis.id.toString());
  }



  getActuInfo(actuUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/previewActu`, actuUrl, httpOptions);
  }

  saveActu(fluxNouvelle: FluxNouvelle) {

    let jSonActu:string = JSON.stringify(fluxNouvelle);
    console.log(jSonActu);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/actu`, jSonActu, httpOptions);
  }

  getActu() {
    const nomUtilisateur = this.getConnectedUtilisateur();
    return this.http.get(`${environment.apiUrl}/actu/`+nomUtilisateur);
  }

  updateActu(fluxNouvelle: FluxNouvelle) {

    let jSonActu:string = JSON.stringify(fluxNouvelle);
    console.log(jSonActu);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };

    return this.http.put(`${environment.apiUrl}/actu/`+fluxNouvelle.id.toString(), jSonActu, httpOptions);
  }

  deleteActu(fluxNouvelle: FluxNouvelle) {
    return this.http.delete(`${environment.apiUrl}/actu/`+fluxNouvelle.id.toString());
  }

  getMeteo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'Accept': '*/*',
      })
    };

    return this.http.get(`${environment.apiUrl}/meteo/get`, httpOptions);
  }
}
