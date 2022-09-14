package com.lina.spring.controllers;

import com.lina.spring.utilJwt.UtilJwt;
import com.lina.spring.dtos.UtilisateurDto;
import com.lina.spring.service.ServiceUtilisateur;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/utilisateur")
public class UtilisateurController {
  private ServiceUtilisateur serviceUtilisateur;

  @PostMapping("/creation")
  public ResponseEntity<?> createUtilisateur(@Valid @RequestBody UtilisateurDto utilisateurDto) {
    if (serviceUtilisateur.existsByNomUtilisateur(utilisateurDto.getNomUtilisateur())) {
      return ResponseEntity
        .badRequest()
        .body("le nom d'utlisateur est déjà pris");
    }

    try {
      utilisateurDto = serviceUtilisateur.saveUtilisateur(utilisateurDto.toUtilisateur());
      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body("L'utilisateur à été créé");
    }
    catch(Exception e) {
      return ResponseEntity
        .badRequest()
        .body(e.getMessage());
    }
  }

  @PostMapping("/connexion")
  public ResponseEntity<?> connexionUtilisateur(@Valid @RequestBody UtilisateurDto utilisateurDto) {
    if (!serviceUtilisateur.existsByNomUtilisateur(utilisateurDto.getNomUtilisateur())) {
      return ResponseEntity
        .badRequest()
        .body("le nom d'utlisateur n'existe pas");
    }

    try {
      Boolean valide = serviceUtilisateur.validateAuthentification(utilisateurDto.getNomUtilisateur(), utilisateurDto.getMotPasse());
      if (valide) {

        utilisateurDto = serviceUtilisateur.findByNomUtilisateur(utilisateurDto.getNomUtilisateur());

        String jeton = UtilJwt.genereJWT(
          utilisateurDto.getNomUtilisateur(),
          utilisateurDto.getPrenom(),
          utilisateurDto.getNomFamille()
        );

        return ResponseEntity
          .accepted()
          .body(jeton);

      } else {
        return ResponseEntity
          .badRequest()
          .body("Mot de passe invalide");
      }
    }
    catch(Exception e) {
      return ResponseEntity
        .badRequest()
        .body(e.getMessage());
    }
  }
}
