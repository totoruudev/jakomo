package com.jakomo.app.controller;

import com.jakomo.app.dto.BannerDTO;
import com.jakomo.app.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    // 카테고리별 배너 조회
    @GetMapping("/category/{category}")
    public List<BannerDTO> getByCategory(@PathVariable String category) {
        return bannerService.getByCategory(category);
    }

    // 타입별 배너 조회
    @GetMapping("/type/{type}")
    public List<BannerDTO> getByType(@PathVariable String type) {
        return bannerService.getByType(type);
    }

    // 타입+카테고리별 배너 조회
    @GetMapping("/type/{type}/category/{category}")
    public List<BannerDTO> getByTypeAndCategory(@PathVariable String type, @PathVariable String category) {
        return bannerService.getByTypeAndCategory(type, category);
    }
}
