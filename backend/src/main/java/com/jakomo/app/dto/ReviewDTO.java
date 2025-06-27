package com.jakomo.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Long id;
    private String title;
    private String content;
    private String image;
    private int rating;
    private int views;
    private int likes;
    private int comments;
    private String user;      // 닉네임 또는 이메일 (user.getName() 또는 user.getEmail())
    private String regdate;
    private String productName;  // r.getProduct().getGname()
    private String productImage; // r.getProduct().getImg1()
}