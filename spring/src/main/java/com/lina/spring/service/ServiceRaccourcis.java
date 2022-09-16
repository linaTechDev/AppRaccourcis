package com.lina.spring.service;

import com.lina.spring.dtos.RaccourcisDto;
import com.lina.spring.models.Raccourcis;
import com.lina.spring.repository.RaccourcisRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceRaccourcis {

  private RaccourcisRepository raccourcisRepository;

  public ServiceRaccourcis(RaccourcisRepository raccourcisRepository) {
    this.raccourcisRepository = raccourcisRepository;
  }

  public RaccourcisDto createRaccourcis(
    String nameSite,
    String urlSite
  ) {
    Raccourcis raccourcis = raccourcisRepository.save(
      new Raccourcis(
        nameSite,
        urlSite
      )
    );
    return raccourcis.toRaccourcisDto();
  }

  public RaccourcisDto saveRaccourcis(Raccourcis raccourcis) {
    return raccourcisRepository.save(raccourcis).toRaccourcisDto();
  }

  public List<RaccourcisDto> getAllRaccourcis() {
    List<Raccourcis> raccourcisList = raccourcisRepository.findAll();
    List<RaccourcisDto> raccourcisDtoList = new ArrayList<>();

    for (Raccourcis raccourcis : raccourcisList) {
      raccourcisDtoList.add(raccourcis.toRaccourcisDto());
    }
    return raccourcisDtoList;
  }

  public RaccourcisDto getRaccourcis(long raccourcisId) {
    return raccourcisRepository.findById(raccourcisId).get().toRaccourcisDto();
  }

  public void deleteRaccourcis(Raccourcis raccourcis) {
    raccourcisRepository.delete(raccourcis);
  }
}
