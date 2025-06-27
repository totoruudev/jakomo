package com.jakomo.app.service;

import com.jakomo.app.dto.PromotionDTO;
import com.jakomo.app.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class PromotionService {
    private final PromotionRepository promotionRepository;

    public List<PromotionDTO> getAllPromotions() {
        return promotionRepository.findAll().stream()
                .map(p -> new PromotionDTO(p.getId(), p.getTitle(), p.getDescription(), p.getImageUrl()))
                .toList();
    }
}