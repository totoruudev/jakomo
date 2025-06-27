package com.jakomo.app.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BannerDTO {
    private Long id;
    private String type;
    private String category;
    private String title;
    private String subtitle;
    private String badge;
    private String image;
    private String link;
    private boolean visible;
    private int displayOrder;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
