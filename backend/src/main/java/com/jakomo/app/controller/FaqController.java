package com.jakomo.app.controller;

import com.jakomo.app.dto.FaqDTO;
import com.jakomo.app.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    // 전체 FAQ 조회
    @GetMapping
    public List<FaqDTO> getAllFaqs() {
        return faqService.getAllFaqs();
    }

    // 카테고리별 FAQ 조회
    @GetMapping("/category/{category}")
    public List<FaqDTO> getFaqsByCategory(@PathVariable String category) {
        return faqService.getFaqsByCategory(category);
    }
}
