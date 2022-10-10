package com.lina.spring.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class MeteoWidget {
  public String city;
  public String timestamp;
  public MeteoActuelle meteoActuelle;
  public PrevisionMeteo[] previsionMeteos;
  public String errorMessage;

  private String getIssued() {
    DateTimeFormatter dateTimeFormatterFromDate = DateTimeFormatter.ofPattern("EEE dd MMM, HH 'h' mm");
    String date = dateTimeFormatterFromDate.format(LocalDateTime.now());
    return date;
  }

  public MeteoWidget(MeteoActuelle meteoActuelle, PrevisionMeteo[] previsionMeteos) {
    this.city = "Montréal, QC";
    this.timestamp = getIssued();
    this.meteoActuelle = meteoActuelle;
    this.previsionMeteos = previsionMeteos;
    this.errorMessage = "";
  }

  public MeteoWidget(String errorMessage) {
    this.city = "Montréal, QC";
    this.timestamp = getIssued();
    this.meteoActuelle = new MeteoActuelle("");
    this.previsionMeteos = new PrevisionMeteo[]{};
    this.errorMessage = errorMessage;
  }
}
