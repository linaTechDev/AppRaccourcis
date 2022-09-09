package com.lina.spring.repository;

import com.lina.spring.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
  Utilisateur findByNomUtilisateur(String nomUtilisateur);
  Boolean existsByNomUtilisateur(String nomUtilisateur);
}
