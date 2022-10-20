package com.lina.spring.models;

import com.lina.spring.dtos.FluxNouvellesDto;
import com.lina.spring.dtos.InfoPreviewFluxNouvellesDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InfoPreviewFluxNouvelles {
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

  public InfoPreviewFluxNouvelles(String title, String raccourcis, String pubDate,
                       String description, String source, String sourceUrl,
                       String imageUrl, String imageBase64, String favIconUrl,
                       String favIconBase64) {
    this.title = title;
    this.raccourcis = raccourcis;
    this.pubDate = pubDate;
    this.description = description;
    this.source = source;
    this.sourceUrl = sourceUrl;
    this.imageUrl = imageUrl;
    this.imageBase64 = imageBase64;
    this.favIconUrl = favIconUrl;
    this.favIconBase64 = favIconBase64;
    this.errorMessage = "";
  }

  public InfoPreviewFluxNouvellesDto toInfoPreviewFluxNouvellesDto() {
    return new InfoPreviewFluxNouvellesDto(
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
  }
}
