package com.lina.spring.repository;

import com.lina.spring.models.Widgets;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WidgetsRepository extends JpaRepository<Widgets, Long> {
}
