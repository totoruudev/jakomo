package com.jakomo.app.service;

import com.jakomo.app.dto.BannerDTO;
import com.jakomo.app.entity.Banner;
import com.jakomo.app.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    // type+visible
    public List<BannerDTO> getByType(String type) {
        return bannerRepository.findByTypeAndVisibleOrderByDisplayOrderAsc(type, true)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // category+visible
    public List<BannerDTO> getByCategory(String category) {
        return bannerRepository.findByCategoryAndVisibleOrderByDisplayOrderAsc(category, true)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // type+category+visible
    public List<BannerDTO> getByTypeAndCategory(String type, String category) {
        return bannerRepository.findByTypeAndCategoryAndVisibleOrderByDisplayOrderAsc(type, category, true)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 엔티티 → DTO 변환
    private BannerDTO toDTO(Banner b) {
        BannerDTO dto = new BannerDTO();
        dto.setId(b.getId());
        dto.setType(b.getType());
        dto.setCategory(b.getCategory());
        dto.setTitle(b.getTitle());
        dto.setSubtitle(b.getSubtitle());
        dto.setBadge(b.getBadge());
        dto.setImage(b.getImage());
        dto.setLink(b.getLink());
        dto.setVisible(b.isVisible());
        dto.setDisplayOrder(b.getDisplayOrder());
        dto.setStartDate(b.getStartDate());
        dto.setEndDate(b.getEndDate());
        return dto;
    }
}
