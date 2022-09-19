package com.lina.spring.service;

import com.lina.spring.dtos.WidgetsDto;
import com.lina.spring.models.Widgets;
import com.lina.spring.repository.WidgetsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceWidgets {

  private WidgetsRepository widgetsRepository;

  public ServiceWidgets(WidgetsRepository widgetsRepository) {
    this.widgetsRepository = widgetsRepository;
  }

  public WidgetsDto createWidgets(
    String name,
    String type
  ) {
    Widgets widgets = widgetsRepository.save(
      new Widgets(
        name,
        type
      )
    );
    return widgets.toWidgetsDto();
  }

  public WidgetsDto saveWidgets(Widgets widgets) {
    return widgetsRepository.save(widgets).toWidgetsDto();
  }

  public List<WidgetsDto> getAllWidgets() {
    List<Widgets> widgetsList = widgetsRepository.findAll();
    List<WidgetsDto> widgetsDtoList = new ArrayList<>();

    for (Widgets widgets : widgetsList) {
      widgetsDtoList.add(widgets.toWidgetsDto());
    }
    return widgetsDtoList;
  }

  public WidgetsDto getWidgets(long widgetsId) {
    return widgetsRepository.findById(widgetsId).get().toWidgetsDto();
  }

  public void deleteWidgets(Widgets widgets) {
    widgetsRepository.delete(widgets);
  }
}
