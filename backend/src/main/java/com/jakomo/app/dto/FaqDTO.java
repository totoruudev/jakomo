package com.jakomo.app.dto;

import lombok.Data;

@Data
public class FaqDTO {
    private Long id;
    private String category;
    private String title;
    private String question;
    private String answer;
    private String imageUrl;
}
