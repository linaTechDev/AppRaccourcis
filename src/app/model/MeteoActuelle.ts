export class MeteoActuelle {
  meteo: string;
  meteoIconURL: string;
  meteoIconBase64: string;
  couvNuageuse: string;
  temperature: string;
  tempRessentis: string;

  constructor(meteo?: string, meteoIconURL?: string, meteoIconBase64?: string, couvNuageuse?: string, temperature?: string, tempRessentis?: string) {
    this.meteo = (meteo) ? meteo : '';
    this.meteoIconURL = (meteoIconURL) ? meteoIconURL : '';
    this.meteoIconBase64 = (meteoIconBase64) ? meteoIconBase64 : '';
    this.couvNuageuse = (couvNuageuse) ? couvNuageuse : '';
    this.temperature = (temperature) ? temperature : '';
    this.tempRessentis = (tempRessentis) ? tempRessentis : '';
  }
}
