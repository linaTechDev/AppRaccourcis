import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, first, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {Utilisateur} from "../../model/Utilisateur";


@Injectable({ providedIn: 'root' })
export class ServiceComponent {
  private userSubject: BehaviorSubject<Utilisateur>;
  public user: Observable<Utilisateur>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<Utilisateur>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Utilisateur {
    return this.userSubject.value;
  }

  creation(user: Utilisateur) {
    console.log(`${environment.apiUrl}/utilisateur/creation`);

    let jSonUser:string = JSON.stringify(user);
    console.log(jSonUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(`${environment.apiUrl}/utilisateur/creation`, jSonUser, httpOptions);
  }
}
