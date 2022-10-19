import {MeteoActuelle} from "./MeteoActuelle";
import {PrevisionMeteo} from "./PrevisionMeteo";

export class Meteo {
  city: string;
  timestamp: string;
  meteoActuelle: MeteoActuelle;
  previsionMeteo: PrevisionMeteo[];
  errorMessage: string;

  constructor(city?: string, timestamp?: string, meteoActuelle?: MeteoActuelle,
              previsionMeteo?: PrevisionMeteo[], errorMessage?: string) {
    this.city = (city) ? city : '';
    this.timestamp = (timestamp) ? timestamp : '';
    this.meteoActuelle = (meteoActuelle) ? meteoActuelle : new MeteoActuelle();
    this.previsionMeteo = (previsionMeteo) ? previsionMeteo : [] as PrevisionMeteo[];
    this.errorMessage = (errorMessage) ? errorMessage : "";
  }

}
