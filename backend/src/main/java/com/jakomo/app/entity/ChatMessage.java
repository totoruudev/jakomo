package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    private String sender; // "user" or "admin" or userEmail

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime sentAt;

    @PrePersist
    public void prePersist() {
        this.sentAt = this.sentAt == null ? LocalDateTime.now() : this.sentAt;
    }
}
