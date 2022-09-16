package com.lina.spring.models;

import com.lina.spring.dtos.RaccourcisDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "raccourcis")
public class Raccourcis {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String nameSite;
  private String urlSite;

  public Raccourcis(String nameSite, String urlSite) {
    this.nameSite = nameSite;
    this.urlSite = urlSite;
  }

  public RaccourcisDto toRaccourcisDto() {
    return new RaccourcisDto(
      String.valueOf(id),
      nameSite,
      urlSite
    );
  }

  @Override
  public String toString() {
    return "Raccourcis{" +
      "nameSite='" + nameSite + '\'' +
      ", urlSite='" + urlSite + '\'' +
      '}';
  }
}
