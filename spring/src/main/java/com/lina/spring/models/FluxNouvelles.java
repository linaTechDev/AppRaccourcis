package com.lina.spring.models;

import com.lina.spring.dtos.FluxNouvellesDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "FluxNouvelles")
public class FluxNouvelles {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String nameSite;
  private String urlSite;

  @ManyToOne
  @JoinColumn(name = "utilisateur")
  @ToString.Exclude
  private Utilisateur utilisateur;

  public FluxNouvelles(String nameSite, String urlSite, Utilisateur utilisateur) {
    this.nameSite = nameSite;
    this.urlSite = urlSite;
    this.utilisateur = utilisateur;
  }

  public FluxNouvellesDto toFluxNouvellesDto() {
    return new FluxNouvellesDto(
      String.valueOf(id),
      nameSite,
      urlSite,
      utilisateur.toUtilisateurDto()
    );
  }
}
