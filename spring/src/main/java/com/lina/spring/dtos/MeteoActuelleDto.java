package com.lina.spring.dtos;

import com.lina.spring.models.MeteoActuelle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeteoActuelleDto {
  public String meteo;
  public String meteoIconUrl;
  public String meteoIconBase64;
  public String couvNuageuse;
  public String temperature;
  public String tempRessentis;
  public String errorMessage;

  public MeteoActuelle toMeteoActuelle() {
    final MeteoActuelle meteoActuelle = new MeteoActuelle(
      meteo,
      meteoIconUrl,
      meteoIconBase64,
      couvNuageuse,
      temperature,
      tempRessentis,
      errorMessage
    );
    return meteoActuelle;
  }
}
