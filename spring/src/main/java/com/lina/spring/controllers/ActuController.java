package com.lina.spring.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.lina.spring.dtos.FluxNouvellesDto;
import com.lina.spring.service.ServiceActu;
import lombok.AllArgsConstructor;
import org.jsoup.HttpStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/actu")
public class ActuController {
  @PostMapping("/fetch")
  public ResponseEntity<?> fetchActu(@Valid @RequestBody String actuUrl) throws JsonProcessingException {
    try {
      Integer actuLimit = 3;
      List<FluxNouvellesDto> actus = ServiceActu.actuFetcher(actuUrl, actuLimit);

      ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
      String jSonActus = ow.writeValueAsString(actus);

      return ResponseEntity
        .status(HttpStatus.OK)
        .body(jSonActus);
    }
    catch(HttpStatusException e) {
      List<FluxNouvellesDto> actus = new ArrayList<>();
      actus.add(new FluxNouvellesDto(
        HttpStatus.valueOf(e.getStatusCode()).name() +
          " (" + e.getStatusCode() + ")" +
          " : " + ((e.getCause() == null) ? e.getMessage() : e.getCause().getMessage())
      ));

      ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
      String jSonActus = ow.writeValueAsString(actus);

      return ResponseEntity
        .status(HttpStatus.OK)
        .body(jSonActus);
    }
    catch(Exception e) {
      return ResponseEntity
        .badRequest()
        .body(e.getMessage());
    }
  }
}
