export class PrevisionMeteo {
  day: string;
  date: string;
  prevision: string;
  meteoIconURL: string;
  meteoIconBase64: string;
  haut: string;
  bas: string;

  constructor(day?: string, date?: string, prevision?: string, meteoIconURL?: string, meteoIconBase64?: string, haut?: string, bas?: string) {
    this.day = (day) ? day : '';
    this.date = (date) ? date : '';
    this.prevision = (prevision) ? prevision : '';
    this.meteoIconURL = (meteoIconURL) ? meteoIconURL : '';
    this.meteoIconBase64 = (meteoIconBase64) ? meteoIconBase64 : '';
    this.haut = (haut) ? haut : '';
    this.bas = (bas) ? bas : '';
  }

}
