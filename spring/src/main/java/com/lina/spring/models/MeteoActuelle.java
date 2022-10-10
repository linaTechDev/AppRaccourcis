package com.lina.spring.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MeteoActuelle {
  public String meteo;
  public String meteoIconUrl;
  public String meteoIconBase64;
  public String couvNuageuse;
  public String temperature;
  public String tempRessentis;
  public String errorMessage;

  public MeteoActuelle(String meteo, String meteoIconUrl, String meteoIconBase64,
                       String couvNuageuse, String temperature, String tempRessentis) {
    this.meteo = meteo;
    this.meteoIconUrl = meteoIconUrl;
    this.meteoIconBase64 = meteoIconBase64;
    this.couvNuageuse = couvNuageuse;
    this.temperature = temperature;
    this.tempRessentis = tempRessentis;
    this.errorMessage = "";
  }

  public MeteoActuelle(String errorMessage) {
    this.meteo = "";
    this.meteoIconUrl = "";
    this.meteoIconBase64 = "";
    this.couvNuageuse = "";
    this.temperature = "";
    this.tempRessentis = "";
    this.errorMessage = errorMessage;
  }
}
