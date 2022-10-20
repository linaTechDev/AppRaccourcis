package com.lina.spring.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.lina.spring.dtos.*;
import com.lina.spring.service.ServiceActu;
import com.lina.spring.service.ServicePreview;
import com.lina.spring.service.ServiceUtilisateur;
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
  private ServiceActu serviceActu;
  private ServiceUtilisateur serviceUtilisateur;

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/{nomUtilisateur}")
  public List<FluxNouvellesDto> getAllFluxNouvellesUtilisateur(@PathVariable String nomUtilisateur) {
    UtilisateurDto utilisateurDto = serviceUtilisateur.findByNomUtilisateur(nomUtilisateur);
    if (utilisateurDto == null) {
      throw new NullPointerException();
    }
    else {
      return serviceActu.getAllFluxNouvelles(utilisateurDto);
    }
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping
  public FluxNouvellesDto createFluxNouvelles(@RequestBody FluxNouvellesForm fluxNouvellesForm) {
    UtilisateurDto utilisateurDto = serviceUtilisateur.findByNomUtilisateur(fluxNouvellesForm.getNomUtilisateur());
    FluxNouvellesDto fluxNouvellesDto = new FluxNouvellesDto(
      null,
      fluxNouvellesForm.getNameSite(),
      fluxNouvellesForm.getUrlSite(),
      utilisateurDto
    );
    return serviceActu.saveFluxNouvelles(fluxNouvellesDto.toFluxNouvelles());
  }

  @PutMapping("/{id}")
  public FluxNouvellesDto updateFluxNouvelles(@PathVariable long id,
                                              @RequestBody FluxNouvellesDto fluxNouvellesDtoDetail) {
    FluxNouvellesDto fluxNouvelles = serviceActu.getFluxNouvelles(id);

    fluxNouvelles.setNameSite(fluxNouvellesDtoDetail.getNameSite());
    fluxNouvelles.setUrlSite(fluxNouvellesDtoDetail.getUrlSite());

    return serviceActu.saveFluxNouvelles(fluxNouvelles.toFluxNouvelles());
  }

  @DeleteMapping("/{id}")
  public void deleteFluxNouvelles(@PathVariable long id) {
    FluxNouvellesDto fluxNouvelles = serviceActu.getFluxNouvelles(id);
    serviceActu.deleteFluxNouvelles(fluxNouvelles.toFluxNouvelles());
  }
}
