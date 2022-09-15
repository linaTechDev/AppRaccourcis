import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceComponent} from "../compte/service/service.component";
import { Token } from '../model/token';


@Component({
  templateUrl: 'accueil.component.html',
  styleUrls: ['accueil.component.css']
})

export class AccueilComponent implements OnInit {
  nomPrenom!: String;
  tokens: Token[];

  constructor(
    private service: ServiceComponent
  ) {

    this.tokens = [
      new Token(
        'Google traduction',
        'https://translate.google.ca/?sl=fr&tl=en&op=translate'
      ),
      new Token(
        'Guide étudiant - AL',
        'https://etudiantcollegial.claurendeau.qc.ca/'
      ),
      new Token(
        'Pixabay',
        'https://pixabay.com/fr/photos/'
      )
    ];

  }

  ngOnInit() {
    this.nomPrenom = this.service.NomPrenom();
  }

  logoutUser() {
    this.service.logout();
  }

}
