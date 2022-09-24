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
  ) {}

  ngOnInit() {
    this.nomPrenom = this.service.NomPrenom();
    this.getRaccourcis();
  }

  logoutUser() {
    this.service.logout();
  }

  getRaccourcis() {
    this.service.getRaccourcis()
      .pipe(first())
      .subscribe(
        (data : any) => {
          console.log('success', data);
        },
        (error: any) => {
          console.log('failed:', error);
        });
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
