import {Component, OnInit} from '@angular/core';
import {ServiceComponent} from "../compte/service/service.component";
import { Raccourcis } from '../model/Raccourcis';
import { FluxNouvelle } from '../model/FluxNouvelle';
import {first} from "rxjs";
import {RaccourcisInfo} from "../model/RaccourcisInfo";
import {ActuInfo} from "../model/ActuInfo";
import {Meteo} from "../model/Meteo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DatePipe, registerLocaleData  } from '@angular/common';
import localeFrCA from '@angular/common/locales/fr-CA';

@Component({
  templateUrl: 'accueil.component.html',
  styleUrls: ['accueil.component.css']
})

export class AccueilComponent implements OnInit {
  nomPrenom!: String;
  raccourcis: Array<Raccourcis> = [];
  actus: Array<FluxNouvelle> = [];
  meteo: Meteo= new Meteo();
  errorMessage!: string;
  raccourci!: FormGroup;
  actu!: FormGroup;
  submitted = false;
  currentDate!: Date;
  weekdays: Array<string> = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  viewDate!: Date;
  calendarStart: string[] = [];
  calendarCurrentStart: string[] = [];
  calendarCurrentDay: string[] = [];
  calendarCurrentEnd: string[] = [];
  calendarCurrent: string[] = [];
  calendarEnd: string[] = [];
  calendarCurrentMonthYear: Boolean = true;
  displayDateFormat: string = 'MMMM yyyy';
  displayDate: string|null = '';

  constructor(
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private service: ServiceComponent
  ) { }

  ngOnInit() {

    this.raccourci = this.formBuilder.group({
      nameSite: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      urlSite: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]]
    });

    this.actu = this.formBuilder.group({
      nameActu: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      urlActu: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]]
    });

    this.nomPrenom = this.service.NomPrenom();

    registerLocaleData(localeFrCA, 'fr-CA');
    this.currentDate = new Date();
    // clone la date et non un simple copy du pointeur
    this.viewDate = new Date(this.currentDate.getTime());

    this.showClocks();
    this.moveSecondHands();
    this.setUpMinuteHands();

    this.showCalendar();
    this.getRaccourcis()

    this.loadActu('Radio-Canada | Info', 'https://ici.radio-canada.ca/rss/1000524');

    this.loadActu('À la une - Google Actualités', 'https://news.google.com/rss?hl=fr-CA&gl=CA&ceid=CA:fr');


    this.getMeteo();

  }

  logoutUser() {
    this.service.logout();
  }

  getRaccourcis() {
    this.service.getRaccourcis()
      .pipe(first())
      .subscribe(
        (data : any) => {
          for (let item of data) {
            console.log(item.nameSite, item.urlSite);
            this.loadRaccourcis(item.nameSite, item.urlSite);
          }
        },
        (error: any) => {
          console.log('failed:', error);
        });
  }

  // convenience getter for easy access to form fields
  get fr() { return this.raccourci.controls; }
  get ff() { return this.actu.controls; }



  raccourciSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.raccourci.invalid) {
      return;
    }

    let item: Raccourcis = this.raccourcis[0];
    this.raccourcis.shift();
    console.log(item);

    let previewARegenerer = false;
    if (item.id == 0) {
      previewARegenerer = true;
    } else {
      let index = this.raccourcis.findIndex(x => (x.nom == item.nom) && (x.url == item.url) && (x.id == item.id));
      if (index > -1) {
        if (this.raccourcis[index].url == this.fr.urlSite.value) {
          // seulement le nom a changer, alors met a jour
          this.raccourcis[index].nom = this.fr.nameSite.value
        } else {
          // l'url a changer supprime, car il faut regénéer le preview
          this.raccourcis.splice(index, 1);
          previewARegenerer = true;
        }
      }
    }
    item.nom = this.fr.nameSite.value;
    item.url = this.fr.urlSite.value;
    console.log(item);

    if (item.id > 0) {
      // TODO: mise-à-jour du raccourci dans le backend
    } else {
      // TODO: ajout du raccourci dans le backend
    }

    if (previewARegenerer) {
      this.loadRaccourcis(
        item.nom,
        item.url
      );
    }
    this.raccourci.reset();

  }

  cancelRaccourci() {
    this.raccourcis.shift();
    this.raccourci.reset();
  }

  addRaccourciClick() {

    // ne pas ajouter, s'il y a déjà un add ou edit en cours
    if (!this.raccourcis[0].nouveau) {
      this.raccourci.reset();
      this.loadRaccourcis(
        '',
        '',
        true
      );
    }
  }

  editRaccourci(item: Raccourcis) {

    // ne pas ajouter, s'il y a déjà un add ou edit en cours
    if (!this.raccourcis[0].nouveau) {
      this.raccourci.reset();
      this.fr.nameSite.setValue(item.nom);
      this.fr.urlSite.setValue(item.url);
      this.loadRaccourcis(
        item.nom,
        item.url,
        true,
        item.id
      );
    }
  }

  deleteRaccourci(item: Raccourcis) {

    // TODO: suppression du raccourci dans le backend

    let index =  this.raccourcis.findIndex(x => (x.nom==item.nom) && (x.url==item.url) && (x.id==item.id) );
    if (index > -1) {
      this.raccourcis.splice(index, 1);
    }
  }



  actuSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.actu.invalid) {
      return;
    }

    let item: FluxNouvelle = this.actus[0];
    this.actus.shift();
    console.log(item);

    let previewARegenerer = false;
    if (item.id == 0) {
      previewARegenerer = true;
    } else {
      let index = this.actus.findIndex(x => (x.nom == item.nom) && (x.url == item.url) && (x.id == item.id));
      if (index > -1) {
        if (this.actus[index].url == this.ff.urlActu.value) {
          // seulement le nom a changer, alors met a jour
          this.actus[index].nom = this.ff.nameActu.value
        } else {
          // l'url a changer supprime, car il faut regénérer le preview
          this.actus.splice(index, 1);
          previewARegenerer = true;
        }
      }
    }
    item.nom = this.ff.nameActu.value;
    item.url = this.ff.urlActu.value;
    console.log(item);

    if (item.id > 0) {
      // TODO: mise-à-jour de actu dans le backend
    } else {
      // TODO: ajout de actu dans le backend
    }

    if (previewARegenerer) {
      this.loadActu(
        item.nom,
        item.url
      );
    }
    this.actu.reset();

  }

  cancelActu() {
    this.actus.shift();
    this.actu.reset();
  }

  addActuClick() {

    // ne pas ajouter, s'il y a déjà un add ou edit en cours
    if (!this.actus[0].nouveau) {
      this.actu.reset();
      this.loadActu(
        '',
        '',
        true
      );
    }
  }

  editActu(item: FluxNouvelle) {

    // ne pas ajouter, s'il y a déjà un add ou edit en cours
    if (!this.actus[0].nouveau) {
      this.actu.reset();
      this.ff.nameActu.setValue(item.nom);
      this.ff.urlActu.setValue(item.url);
      this.loadActu(
        item.nom,
        item.url,
        true,
        item.id
      );
    }
  }

  deleteActu(item: FluxNouvelle) {

    // TODO: suppression de actu dans le backend

    let index =  this.actus.findIndex(x => (x.nom==item.nom) && (x.url==item.url) && (x.id==item.id) );
    if (index > -1) {
      this.actus.splice(index, 1);
    }
  }




  loadRaccourcis(nom: string, url: string, nouveau?: boolean, id?: number) {
    if (nouveau) {
      let raccourcisInfo = new RaccourcisInfo("", url, "", "", "",
        "", "", "", "");
      let raccourcis = new Raccourcis((id) ? id : 0, nom, url, raccourcisInfo, nouveau);
      this.raccourcis.unshift(raccourcis);

      const leftAccueil = document.querySelector('.leftAccueil') as HTMLElement | null;
      if (leftAccueil != null) {
        leftAccueil.scrollTop = 0;
      }

    } else {
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
            let raccourcis = new Raccourcis(this.raccourcis.length+1, nom, url, raccourcisInfo);
            this.raccourcis.push(raccourcis);
            if (data.errorMessage) {
              console.log('raccourcisInfo failed:', nom, url, data.errorMessage);
            } else {
              console.log('raccourcisInfo success:', raccourcisInfo.title, raccourcisInfo.url);
            }
          },
          (error: any) => {
            console.log('raccourcisInfo failed:', nom, url, error);
            let raccourcisInfo = new RaccourcisInfo("", url, "", "", "",
              "", "", "", "");
            let raccourcis = new Raccourcis(this.raccourcis.length+1, nom, url, raccourcisInfo);
            this.raccourcis.push(raccourcis);
          });
    }
  }

  loadActu(nom: string, url: string, nouveau?: boolean, id?: number) {
    if (nouveau) {
      let actusInfos: Array<ActuInfo> = [];
      let actu = new FluxNouvelle((id) ? id : 0, nom, url, '', '', actusInfos, nouveau);
      this.actus.unshift(actu);

      const rightAccueil = document.querySelector('.rightAccueil') as HTMLElement | null;
      if (rightAccueil != null) {
        rightAccueil.scrollTop = 0;
      }

    } else {

      this.service.fetchActus(url)
        .pipe(first())
        .subscribe(
          (data: any) => {
            let actusInfos: Array<ActuInfo> = data;

            this.service.getRaccourcisInfo(url)
              .pipe(first())
              .subscribe(
                (data: any) => {
                  let actu = new FluxNouvelle(this.actus.length+1, nom, url, data.favIconUrl, data.favIconBase64, actusInfos);
                  this.actus.push(actu);
                  if (data.errorMessage) {
                    console.log('actusInfos raccourcisInfo failed:', url, data.errorMessage);
                  } else {
                    console.log('actusInfos raccourcisInfo success:', url);
                  }
                },
                (error: any) => {
                  console.log('actusInfos raccourcisInfo failed:', nom, url, error);
                  let actu = new FluxNouvelle(this.actus.length+1, nom, url, '', '', actusInfos);
                  this.actus.push(actu);
                });

            if (data.errorMessage) {
              console.log('actusInfos failed:', url, data.errorMessage);
            } else {
              console.log('actusInfos success:', url);
            }
          },
          (error: any) => {
            console.log('actusInfos failed:', url, error);
            let actusInfos: Array<ActuInfo> = [];

            this.service.getRaccourcisInfo(url)
              .pipe(first())
              .subscribe(
                (data: any) => {
                  let actu = new FluxNouvelle(this.actus.length+1, nom, url, data.favIconUrl, data.favIconBase64, actusInfos);
                  this.actus.push(actu);
                  if (data.errorMessage) {
                    console.log('actusInfos raccourcisInfo failed:', url, data.errorMessage);
                  } else {
                    console.log('actusInfos raccourcisInfo success:', url);
                  }
                },
                (error: any) => {
                  console.log('actusInfos raccourcisInfo failed:', nom, url, error);
                  let actu = new FluxNouvelle(this.actus.length+1, nom, url, '', '', actusInfos);
                  this.actus.push(actu);
                });

          });
    }
  }


  getMeteo() {
    this.service.getMeteo()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.meteo = new Meteo(data.city, data.timestamp, data.meteoActuelle, data.previsionMeteos);
          if (data.errorMessage) {
            console.log('Meteo failed:', data.errorMessage);
          } else {
            console.log('Meteo success:', data.meteoActuelle.meteo);
          }
        },
        (error: any) => {
          console.log('Meteo failed', error);
          this.meteo = new Meteo();
          if (error.error) {
            this.meteo.errorMessage = error.error;
          }
        });

  }


  showClocks() {
    let date = this.currentDate;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutes',
        angle: (minutes * 6)
      },
      {
        hand: 'seconds',
        angle: (seconds * 6)
      }
    ];

    for (let j = 0; j < hands.length; j++) {
      let elements: NodeListOf<Element> = document.querySelectorAll('.' + hands[j].hand);
      for (let k = 0; k < elements.length; k++) {
        // @ts-ignore
        elements[k]['style'].webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
        // @ts-ignore
        elements[k]['style'].transform = 'rotateZ('+ hands[j].angle +'deg)';
        if (hands[j].hand === 'minutes') {
          // @ts-ignore
          elements[k].parentNode['setAttribute']('data-second-angle', hands[j + 1].angle);
        }
      }
    }
  }


  setUpMinuteHands() {
    let containers: NodeListOf<Element> = document.querySelectorAll('.minutes-container');
    let secondAngle: string | null = containers[0].getAttribute("data-second-angle");
    if (secondAngle) {
      let angle: number = +secondAngle;
      if (angle > 0) {
        let delay = (((360 - angle) / 6) + 0.1) * 1000;
        setTimeout(() => {
          this.moveMinuteHands(containers);
        }, delay);
      }
    }
  }

  moveMinuteHands(containers:  NodeListOf<Element>) {
    for (let i = 0; i < containers.length; i++) {
      // @ts-ignore
      containers[i]['style'].webkitTransform = 'rotateZ(6deg)';
      // @ts-ignore
      containers[i]['style'].transform = 'rotateZ(6deg)';
    }

    setInterval(function() {
      for (let i = 0; i < containers.length; i++) {
        // @ts-ignore
        if (containers[i].angle === undefined) {
          // @ts-ignore
          containers[i].angle = 12;
        } else {
          // @ts-ignore
          containers[i].angle += 6;
        }
        // @ts-ignore
        containers[i]['style'].webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        // @ts-ignore
        containers[i]['style'].transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 60000);
  }

  moveSecondHands() {
    let containers:  NodeListOf<Element> = document.querySelectorAll('.seconds-container');
    setInterval(function() {
      for (var i = 0; i < containers.length; i++) {
        // @ts-ignore
        if (containers[i].angle === undefined) {
          // @ts-ignore
          containers[i].angle = 6;
        } else {
          // @ts-ignore
          containers[i].angle += 6;
        }
        // @ts-ignore
        containers[i]['style'].webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        // @ts-ignore
        containers[i]['style'].transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 1000);
  }

  showCalendar() {

    this.displayDate =this.datepipe.transform(this.viewDate, this.displayDateFormat);
    let firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    let lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    let firstDay_DayOfWeek = firstDay.getDay();
    let lastDay_DayOfWeek = lastDay.getDay();
    this.calendarStart = [];
    this.calendarCurrentStart = [];
    this.calendarCurrentDay = [];
    this.calendarCurrentEnd = [];
    this.calendarCurrent = [];
    this.calendarEnd = [];

    // pour remplir le début du calendrier avec la fin du mois précédent
    if (firstDay_DayOfWeek > 0) {
      // clone la date et non un simple copy du pointeur
      let previousMonthDate = new Date(firstDay.getTime());
      previousMonthDate.setDate(firstDay.getDate() - firstDay_DayOfWeek);

      for(let i=0; i<firstDay_DayOfWeek; i++) {
        let displayDay: string = previousMonthDate.getDate().toString();
        if (i == 0) {
          displayDay = displayDay + "/" + (previousMonthDate.getMonth() + 1).toString();
        }
        this.calendarStart.push(displayDay);
        previousMonthDate.setDate(previousMonthDate.getDate()+1);
      }
    }

    // clone la date et non un simple copy du pointeur
    let calendarDate = new Date(firstDay.getTime());
    // pour remplir le calendrier du mois courant
    if ( (firstDay.getMonth() === this.currentDate.getMonth()) &&
      (firstDay.getFullYear() === this.currentDate.getFullYear()) ) {
      // mois courant

      this.calendarCurrentMonthYear = true;

      for(let i=firstDay.getDate(); i<this.currentDate.getDate(); i++) {
        let displayDay: string = calendarDate.getDate().toString();
        this.calendarCurrentStart.push(displayDay);
        calendarDate.setDate(calendarDate.getDate()+1);
      }

      if (calendarDate.getDate() === this.currentDate.getDate()) {
        let displayDay: string = this.currentDate.getDate().toString();
        this.calendarCurrentDay.push(displayDay);
        calendarDate.setDate(calendarDate.getDate() + 1);
      }

      for(let i=calendarDate.getDate(); i<=lastDay.getDate(); i++) {
        let displayDay: string = calendarDate.getDate().toString();
        this.calendarCurrentEnd.push(displayDay);
        calendarDate.setDate(calendarDate.getDate()+1);
      }

    } else {
      // autres mois

      this.calendarCurrentMonthYear = false;

      for(let i=firstDay.getDate(); i<=lastDay.getDate(); i++) {
        let displayDay: string = calendarDate.getDate().toString();
        this.calendarCurrent.push(displayDay);
        calendarDate.setDate(calendarDate.getDate()+1);
      }

    }

    // pour remplir le reste du calendrier avec le début du mois suivant
    if (lastDay_DayOfWeek < 6) {
      // clone la date et non un simple copy du pointeur
      let nextMonthDate = new Date(lastDay.getTime());
      nextMonthDate.setDate(lastDay.getDate() + 1);

      for(let i=lastDay_DayOfWeek+1; i<=6; i++) {
        let displayDay: string = nextMonthDate.getDate().toString();
        if (i == lastDay_DayOfWeek+1) {
          displayDay = displayDay + "/" + (nextMonthDate.getMonth() + 1).toString();
        }
        this.calendarEnd.push(displayDay);
        nextMonthDate.setDate(nextMonthDate.getDate()+1);
      }
    }

  }

  next() {
    this.viewDate.setMonth(this.viewDate.getMonth()+1);
    this.showCalendar();
  }

  previous() {
    this.viewDate.setMonth(this.viewDate.getMonth()-1);
    this.showCalendar();
  }
}
