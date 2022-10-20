package com.lina.spring.repository;

import com.lina.spring.models.FluxNouvelles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FluxNouvellesRepository extends JpaRepository<FluxNouvelles, Long> {
  @Query(value = "SELECT f FROM FluxNouvelles f WHERE f.utilisateur.nomUtilisateur = :nomUtilisateur")
  List<FluxNouvelles> getFluxNouvellesUtilisateur(@Param("nomUtilisateur") String nomUtilisateur);
}
