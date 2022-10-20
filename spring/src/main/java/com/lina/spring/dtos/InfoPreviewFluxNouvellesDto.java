package com.lina.spring.dtos;

import com.lina.spring.models.FluxNouvelles;
import com.lina.spring.models.InfoPreviewFluxNouvelles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InfoPreviewFluxNouvellesDto {
  private String title;
  private String raccourcis;
  private String pubDate;
  private String description;
  private String source;
  private String sourceUrl;
  private String imageUrl;
  private String imageBase64;
  private String favIconUrl;
  private String favIconBase64;
  private String errorMessage;

  public InfoPreviewFluxNouvellesDto(String errorMessage) {
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

  public InfoPreviewFluxNouvelles toInfoPreviewFluxNouvelles() {
    final InfoPreviewFluxNouvelles infoPreviewFluxNouvelles = new InfoPreviewFluxNouvelles(
      title,
      raccourcis,
      pubDate,
      description,
      source,
      sourceUrl,
      imageUrl,
      imageBase64,
      favIconUrl,
      favIconBase64
    );
    return infoPreviewFluxNouvelles;
  }
}
