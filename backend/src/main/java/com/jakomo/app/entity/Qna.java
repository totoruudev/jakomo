package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 질문 작성자
    @ManyToOne
    private User user;

    private String title;

    @Column(length = 1000)
    private String content;

    private String answer; // 관리자 답변

    @Builder.Default
    private boolean answered = false;

    @Builder.Default
    private LocalDateTime regdate = LocalDateTime.now();
}
