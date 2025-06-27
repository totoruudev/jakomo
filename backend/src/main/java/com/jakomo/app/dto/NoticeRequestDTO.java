package com.jakomo.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeRequestDTO {
    private String title;
    private String content;
    private boolean isImportant; // 중요 공지 여부
}
