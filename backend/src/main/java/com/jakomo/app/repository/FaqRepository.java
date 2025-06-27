package com.jakomo.app.repository;

import com.jakomo.app.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findByCategory(String category);
}
