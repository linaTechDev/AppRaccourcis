package com.lina.spring.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.lina.spring.dtos.MeteoWidgetDto;
import com.lina.spring.service.ServiceMeteo;
import com.lina.spring.service.ServiceMeteoAPICallLimite;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/meteo")
public class MeteoController {
  @GetMapping("/get")
  public ResponseEntity<?> get() {
    try {
      if (ServiceMeteoAPICallLimite.canMakeCall()) {

        MeteoWidgetDto meteo = ServiceMeteo.getMeteo().toMeteoWidgetDto();
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String jSonWeather = ow.writeValueAsString(meteo.toMeteoWidget());

        return ResponseEntity
          .status(HttpStatus.OK)
          .body(jSonWeather);

      } else {

        return ResponseEntity
          .status(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED)
          .body("Météo: Vous avez atteint la limite d'appels (60) par minute, veuillez réessayer dans une minute");
      }
    }
    catch(Exception e) {
      return ResponseEntity
        .badRequest()
        .body(e.getMessage());
    }
  }
}
