package com.lina.spring.dtos;

import com.lina.spring.models.FluxNouvelles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FluxNouvellesDto {
  public String title;
  public String raccourcis;
  public String pubDate;
  public String description;
  public String source;
  public String sourceUrl;
  public String imageUrl;
  public String imageBase64;
  public String favIconUrl;
  public String favIconBase64;
  public String errorMessage;

  public FluxNouvellesDto(String errorMessage) {
    this.title = "";
    this.raccourcis = "";
    this.pubDate = "";
    this.description = "";
    this.source = "";
    this.sourceUrl = "";
    this.imageUrl = "";
    this.imageBase64 = "";
    this.favIconUrl = "";
    this.favIconBase64 = "";
    this.errorMessage = errorMessage;
  }

  public FluxNouvelles toFluxNouvelles() {
    final FluxNouvelles fluxNouvelles = new FluxNouvelles(
      title,
      raccourcis,
      pubDate,
      description,
      source,
      sourceUrl,
      imageUrl,
      imageBase64,
      favIconUrl,
      favIconBase64,
      errorMessage
    );
    return fluxNouvelles;
  }
}
