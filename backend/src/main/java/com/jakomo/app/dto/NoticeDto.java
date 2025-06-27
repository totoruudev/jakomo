package com.jakomo.app.dto;

import lombok.Data;

@Data
public class NoticeDto {
    private Long id;
    private String title;
    private String content;
    private boolean isImportant;
    private String regdate;
}