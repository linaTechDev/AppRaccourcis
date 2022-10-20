package com.lina.spring.dtos;

import com.lina.spring.models.FluxNouvelles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FluxNouvellesDto {
  private String id;
  private String nameSite;
  private String urlSite;
  public UtilisateurDto utilisateurDto;

  public FluxNouvelles toFluxNouvelles() {
    final FluxNouvelles fluxNouvelles = new FluxNouvelles(
      nameSite,
      urlSite,
      utilisateurDto.toUtilisateur()
    );
    long oldId;
    try {
      oldId = Integer.parseInt(id);
      if (oldId > 0)
        fluxNouvelles.setId(oldId);
    } catch (NumberFormatException ignored) {}
    return fluxNouvelles;
  }
}
