package com.lina.spring.controllers;

import com.lina.spring.dtos.RaccourcisDto;
import com.lina.spring.service.ServiceRaccourcis;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/raccourcis")
public class RaccourcisController {
  private ServiceRaccourcis serviceRaccourcis;

  @GetMapping
  public List<RaccourcisDto> getAllRaccourcis() {
    return serviceRaccourcis.getAllRaccourcis();
  }

  @GetMapping("/{id}")
  public RaccourcisDto getRaccourcis(@PathVariable long id) {
    return serviceRaccourcis.getRaccourcis(id);
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping
  public RaccourcisDto createRaccourcis(@RequestBody RaccourcisDto raccourcisDto) {
    return serviceRaccourcis.saveRaccourcis(raccourcisDto.toRaccourcis());
  }

  @PutMapping("/{id}")
  public RaccourcisDto updateRaccourcis(@PathVariable long id,
                                        @RequestBody RaccourcisDto raccourcisDtoDetail) {
    RaccourcisDto raccourcis = serviceRaccourcis.getRaccourcis(id);

    raccourcis.setNameSite(raccourcisDtoDetail.getNameSite());
    raccourcis.setUrlSite(raccourcisDtoDetail.getUrlSite());

    return serviceRaccourcis.saveRaccourcis(raccourcis.toRaccourcis());
  }

  @DeleteMapping("/{id}")
  public void deleteRaccourcis(@PathVariable long id) {
    RaccourcisDto raccourcis = serviceRaccourcis.getRaccourcis(id);
    serviceRaccourcis.deleteRaccourcis(raccourcis.toRaccourcis());
  }
}
