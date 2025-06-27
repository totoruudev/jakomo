package com.jakomo.app.service;

import com.jakomo.app.dto.FaqDTO;
import com.jakomo.app.entity.Faq;
import com.jakomo.app.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    // 전체 조회
    public List<FaqDTO> getAllFaqs() {
        return faqRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 카테고리별 조회
    public List<FaqDTO> getFaqsByCategory(String category) {
        return faqRepository.findByCategory(category).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public FaqDTO toDto(Faq faq) {
        FaqDTO dto = new FaqDTO();
        dto.setId(faq.getId());
        dto.setCategory(faq.getCategory());
        dto.setTitle(faq.getTitle());
        dto.setQuestion(faq.getQuestion());
        dto.setAnswer(faq.getAnswer());
        dto.setImageUrl(faq.getImageUrl());
        return dto;
    }
}
