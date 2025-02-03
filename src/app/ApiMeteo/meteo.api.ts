import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class MeteoApiService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  /**
   * Récupère les données météo actuelles et les prévisions.
   * @param latitude Latitude de la localisation.
   * @param longitude Longitude de la localisation.
   * @param forecastDays Nombre de jours de prévision à récupérer.
   */
  getWeatherData(latitude: number, longitude: number, forecastDays: number): Observable<any> {
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,apparent_temperature,weather_code,cloud_cover',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max',
      forecast_days: forecastDays.toString(),
    };

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Erreur API Météo:', error);
        throw error;
      })
    );
  }
}
