package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;           // 리뷰 제목
    private int rating;             // 별점
    private String content;         // 내용
    private String image;           // 이미지 경로 (필요시 json array도 가능)
    private boolean isBest;         // 베스트 포토후기 여부

    private int views;              // 조회수
    private int likes;              // 좋아요 수
    private int comments;           // 댓글 수

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDateTime regdate;

    @PrePersist
    public void prePersist() {
        this.regdate = this.regdate == null ? LocalDateTime.now() : this.regdate;
        this.views = this.views == 0 ? 0 : this.views;
        this.likes = this.likes == 0 ? 0 : this.likes;
        this.comments = this.comments == 0 ? 0 : this.comments;
    }
}
