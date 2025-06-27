package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faq")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // pay, general, color

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answer;

    // 이미지 파일 경로 (선택)
    private String imageUrl;
}
