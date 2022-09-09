package com.lina.spring.controllers;

import com.lina.spring.dtos.UtilisateurDto;
import com.lina.spring.reponse.MessageReponse;
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
        .body(new MessageReponse("Erreur: le nom d'utlisateur est déjà pris"));
    }

    return new ResponseEntity<>(serviceUtilisateur.saveUtilisateur(utilisateurDto.toUtilisateur()),
      HttpStatus.CREATED);
  }

  @PostMapping("/connexion")
  public ResponseEntity<?> connexionUtilisateur(@Valid @RequestBody UtilisateurDto utilisateurDto) {
    if (!serviceUtilisateur.existsByNomUtilisateur(utilisateurDto.getNomUtilisateur())) {
      return ResponseEntity
        .badRequest()
        .body(new MessageReponse("Erreur: le nom d'utlisateur n'existe pas"));
    }
    return new ResponseEntity<>(serviceUtilisateur.validateAuthentification(utilisateurDto.getNomUtilisateur(), utilisateurDto.getMotPasse()),
      HttpStatus.ACCEPTED);
  }
}
