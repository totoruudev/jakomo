package com.jakomo.app.repository;

import com.jakomo.app.entity.Banner;
import com.jakomo.app.entity.CollabSofa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long>{
    List<Banner> findByTypeAndVisibleOrderByDisplayOrderAsc(String type, boolean visible);
    List<Banner> findByCategoryAndVisibleOrderByDisplayOrderAsc(String category, boolean visible);
    List<Banner> findByTypeAndCategoryAndVisibleOrderByDisplayOrderAsc(String type, String category, boolean visible);
}
