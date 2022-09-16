package com.lina.spring.repository;

import com.lina.spring.models.Raccourcis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RaccourcisRepository extends JpaRepository<Raccourcis, Long> {
}
