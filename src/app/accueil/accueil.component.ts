import {Component, OnInit} from '@angular/core';
import {ServiceComponent} from "../compte/service/service.component";
import {Raccourcis} from "../model/Raccourcis";
import {first} from "rxjs";
import {RaccourcisInfo} from "../model/RaccourcisInfo"


@Component({
  templateUrl: 'accueil.component.html',
  styleUrls: ['accueil.component.css']
})

export class AccueilComponent implements OnInit {
  nomPrenom!: String;
  raccourcis: Array<Raccourcis> = [];

  constructor(
    private service: ServiceComponent
  ) {
    this.addRaccourcis(
      'Google traduction',
      'https://translate.google.ca/?sl=fr&tl=en&op=translate'
    );

    this.addRaccourcis(
      'Guide étudiant - AL',
      'https://etudiantcollegial.claurendeau.qc.ca/'
    );

    this.addRaccourcis(
      'Devenir architecte',
      'https://www.studyrama.com/formations/specialites/architecture-urbanisme-paysagisme/en-architecture-le-danger-est-de-penser-que-l-ecole-104298'
    );

    this.addRaccourcis(
      'Pixabay: Photos libres de droits & gratuites à télécharger',
      'https://pixabay.com/fr/photos/'
    );

    this.addRaccourcis(
      'Stack Overflow',
      'https://stackoverflow.com/'
    );

    this.addRaccourcis(
      'Trello',
      'https://trello.com/fr'
    );

    this.addRaccourcis(
      'Looka',
      'https://looka.com/'
    );
  }

  ngOnInit() {
    this.nomPrenom = this.service.NomPrenom();
  }

  logoutUser() {
    this.service.logout();
  }

  addRaccourcis(nom:string, url:string) {
    this.service.getRaccourcisInfo(url)
      .pipe(first())
      .subscribe(
        (data: any) => {
            let raccourcisInfo = {
              domain: data.domain,
              url: (data.url.isEmpty ? url : data.url),
              title: (data.title.isEmpty ? nom : data.title),
              description: data.description,
              imageUrl: data.imageUrl,
              imageAlt: data.imageAlt,
              favIconUrl: data.favIconUrl,
              imageBase64: data.imageBase64,
              favIconBase64: data.favIconBase64
            }
            let raccourcis = new Raccourcis(nom, url, raccourcisInfo);
            this.raccourcis.push(raccourcis);
          if (data.errorMessage) {
            console.log('failed:', nom, url, data.errorMessage);
          } else {
            console.log('success:', raccourcisInfo.title, raccourcisInfo.url);
          }
        },
        (error: any) => {
          console.log('failed:', nom, url, error);
          let raccourcisInfo = new RaccourcisInfo("", url, "", "", "",
            "", "", "", "");
          let raccourcis = new Raccourcis(nom, url, raccourcisInfo);
          this.raccourcis.push(raccourcis);
        });
  }

}
