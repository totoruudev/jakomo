package com.jakomo.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // "promo_banner", "promo_event", "offline_banner", "offline_event", "promotion", "collab_banner", "collab_sofa" 등
    private String category; // "online", "offline", "collab", "promotion" 등

    private String title;
    private String subtitle;
    private String badge;

    private String image;
    private String link;

    private boolean visible;
    private int displayOrder;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
