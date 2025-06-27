package com.jakomo.app.repository;

import com.jakomo.app.entity.CollabSofa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollabSofaRepository extends JpaRepository<CollabSofa, Long> {
    List<CollabSofa> findByVisibleOrderByDisplayOrderAsc(boolean visible);
}
