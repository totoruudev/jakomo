package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private LocalDateTime regdate;

    @Column(nullable = false)
    private boolean isImportant = false; // 중요 공지 여부

    @PrePersist
    public void prePersist() {
        this.regdate = this.regdate == null ? LocalDateTime.now() : this.regdate;
    }
}
