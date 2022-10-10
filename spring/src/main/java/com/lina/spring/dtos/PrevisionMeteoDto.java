package com.lina.spring.dtos;

import com.lina.spring.models.PrevisionMeteo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrevisionMeteoDto {
  public String jour;
  public String date;
  public String prevision;
  public String meteoIconUrl;
  public String meteoIconBase64;
  public String haut;
  public String bas;
  public String errorMessage;

  public PrevisionMeteo toPrevisionMeteo() {
    final PrevisionMeteo previsionMeteo = new PrevisionMeteo(
      jour,
      date,
      prevision,
      meteoIconUrl,
      meteoIconBase64,
      haut,
      bas,
      errorMessage
    );
    return previsionMeteo;
  }
}
