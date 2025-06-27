package com.jakomo.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PromotionDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
}