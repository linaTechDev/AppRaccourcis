package com.lina.spring.models;

import com.lina.spring.dtos.FluxNouvellesDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FluxNouvelles {
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

  public FluxNouvelles(String title, String raccourcis, String pubDate,
                       String description, String source, String sourceUrl,
                       String imageUrl, String imageBase64, String favIconUrl, String favIconBase64) {
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

  public FluxNouvellesDto toFluxNouvellesDto() {
    return new FluxNouvellesDto(
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
