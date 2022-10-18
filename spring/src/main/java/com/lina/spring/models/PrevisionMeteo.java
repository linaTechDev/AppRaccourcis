package com.lina.spring.models;

import com.lina.spring.dtos.PrevisionMeteoDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PrevisionMeteo {
  public String jour;
  public String date;
  public String prevision;
  public String meteoIconUrl;
  public String meteoIconBase64;
  public String haut;
  public String bas;
  public String errorMessage;

  public PrevisionMeteo(String jour, String date, String prevision,
                        String meteoIconUrl, String meteoIconBase64, String haut, String bas) {
    this.jour = jour;
    this.date = date;
    this.prevision = prevision;
    this.meteoIconUrl = meteoIconUrl;
    this.meteoIconBase64 = meteoIconBase64;
    this.haut = haut;
    this.bas = bas;
    this.errorMessage = "";
  }

  public PrevisionMeteo(String errorMessage) {
    this.jour = "";
    this.date = "";
    this.prevision = "";
    this.meteoIconUrl = "";
    this.meteoIconBase64 = "";
    this.haut = "";
    this.bas = "";
    this.errorMessage = errorMessage;
  }

  public PrevisionMeteoDto toPrevisionMeteoDto() {
    return new PrevisionMeteoDto(
      jour,
      date,
      prevision,
      meteoIconUrl,
      meteoIconBase64,
      haut,
      bas,
      errorMessage
    );
  }
}
