import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Utilisateur} from "../../model/Utilisateur";
import {JwtHelperService} from '@auth0/angular-jwt';


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

  getConnectedUtilisateur(): String {
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

    return this.http.post(`${environment.apiUrl}/preview`, raccourcisUrl, httpOptions);
  }

  getRaccourcis() {
    const nomUtilisateur = this.getConnectedUtilisateur();
    return this.http.get(`${environment.apiUrl}/raccourcis/`+nomUtilisateur);
  }

  fetchActus(actuUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'Accept': '*/*'
      })
    };

    return this.http.post(`${environment.apiUrl}/actu/fetch`, actuUrl, httpOptions);
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
