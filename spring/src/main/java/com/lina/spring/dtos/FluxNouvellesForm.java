package com.lina.spring.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FluxNouvellesForm {
  private String id;
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
  private String nomUtilisateur;
}
