package com.lina.spring.service;

import com.lina.spring.dtos.UtilisateurDto;
import com.lina.spring.models.Utilisateur;
import com.lina.spring.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceUtilisateur {

  private UtilisateurRepository utilisateurRepository;

  public ServiceUtilisateur(UtilisateurRepository utilisateurRepository) {
    this.utilisateurRepository = utilisateurRepository;
  }

  public UtilisateurDto saveUtilisateur(
    String prenom,
    String nomFamille,
    String nomUtilisateur,
    String motPasse
  ) {
    Utilisateur utilisateur = utilisateurRepository.save(new Utilisateur(
      prenom,
      nomFamille,
      nomUtilisateur,
      motPasse
    ));
    return utilisateur.toUtilisateurDto();
  }

  public UtilisateurDto saveUtilisateur(Utilisateur utilisateur) {
    return utilisateurRepository.save(utilisateur).toUtilisateurDto();
  }

  public boolean existsByNomUtilisateur(String nomUtilisateur) {
    return utilisateurRepository.existsByNomUtilisateur(nomUtilisateur);
  }

  public UtilisateurDto findByNomUtilisateur(String nomUtilisateur) {
    Utilisateur utilisateur = utilisateurRepository.findByNomUtilisateur(nomUtilisateur);
    if (utilisateur != null) {
      return utilisateur.toUtilisateurDto();
    }
    return null;
  }

  public boolean validateAuthentification(String nomUtilisateur, String motPasse) {
    Utilisateur utilisateur = findByNomUtilisateur(nomUtilisateur).toUtilisateur();
    if (utilisateur != null) {
      return motPasse.equals(utilisateur.getMotPasse());
    }
    return false;
  }
}
