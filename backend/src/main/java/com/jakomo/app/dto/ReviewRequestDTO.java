package com.jakomo.app.dto;

import lombok.Data;

@Data
public class ReviewRequestDTO {
    private Long productId;
    private String title;
    private String image;
    private int rating;
    private String content;
    private boolean isBest;
    // views/likes/comments는 서버에서 처리
}
