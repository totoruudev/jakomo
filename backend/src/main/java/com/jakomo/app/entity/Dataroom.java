package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dataroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;             // 제목
    private String content;           // 내용

    private String filename;          // 실제 저장된 파일명
    private String originalFilename;  // 업로드 시의 원래 파일명
    private String filepath;          // 파일 경로
    private long filesize;            // 파일 크기

    @Builder.Default
    private LocalDateTime uploadedAt = LocalDateTime.now(); // 업로드 일시
}
