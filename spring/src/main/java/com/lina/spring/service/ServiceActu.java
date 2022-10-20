package com.lina.spring.service;

import com.lina.spring.dtos.FluxNouvellesDto;
import com.lina.spring.dtos.InfoPreviewFluxNouvellesDto;
import com.lina.spring.dtos.UtilisateurDto;
import com.lina.spring.models.FluxNouvelles;
import com.lina.spring.models.InfoPreviewRaccourcis;
import com.lina.spring.repository.FluxNouvellesRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ServiceActu {
  private FluxNouvellesRepository fluxNouvellesRepository;

  public ServiceActu(FluxNouvellesRepository fluxNouvellesRepository) {
    this.fluxNouvellesRepository = fluxNouvellesRepository;
  }

  public FluxNouvellesDto saveFluxNouvelles(FluxNouvelles fluxNouvelles) {
    return fluxNouvellesRepository.save(fluxNouvelles).toFluxNouvellesDto();
  }

  public List<FluxNouvellesDto> getAllFluxNouvelles(UtilisateurDto utilisateurDto) {
    List<FluxNouvelles> fluxNouvellesList = fluxNouvellesRepository.getFluxNouvellesUtilisateur(utilisateurDto.getNomUtilisateur());
    List<FluxNouvellesDto> fluxNouvellesDtoList = new ArrayList<>();

    for (FluxNouvelles fluxNouvelles : fluxNouvellesList) {
      fluxNouvellesDtoList.add(fluxNouvelles.toFluxNouvellesDto());
    }
    return fluxNouvellesDtoList;
  }

  public FluxNouvellesDto getFluxNouvelles(long fluxNouvellesId) {
    return fluxNouvellesRepository.findById(fluxNouvellesId).get().toFluxNouvellesDto();
  }

  public void deleteFluxNouvelles(FluxNouvelles fluxNouvelles) {
    fluxNouvellesRepository.delete(fluxNouvelles);
  }
}
