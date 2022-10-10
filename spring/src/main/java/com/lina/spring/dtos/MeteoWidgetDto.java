package com.lina.spring.dtos;

import com.lina.spring.models.MeteoWidget;
import com.lina.spring.models.PrevisionMeteo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeteoWidgetDto {
  public String city;
  public String timestamp;
  public MeteoActuelleDto meteoActuelleDto;
  public PrevisionMeteoDto[] previsionMeteoDtos;
  public String errorMessage;

  public MeteoWidget toMeteoWidget() {
    PrevisionMeteo[] previsionMeteoDto = null;
    for(int i = 0; i < previsionMeteoDtos.length; i++) {
      previsionMeteoDto[i] = previsionMeteoDtos[i].toPrevisionMeteo();
    }
    PrevisionMeteo[] previsionMeteo = previsionMeteoDto;
    final MeteoWidget meteoWidget = new MeteoWidget(
      city,
      timestamp,
      meteoActuelleDto.toMeteoActuelle(),
      previsionMeteo,
      errorMessage
    );
    return meteoWidget;
  }
}
