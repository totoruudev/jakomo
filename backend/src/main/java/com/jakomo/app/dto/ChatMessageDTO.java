package com.jakomo.app.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {

    private Long roomId;      // 채팅방 ID
    private String sender;    // 보낸 사람 (userEmail or "admin")
    private String content;   // 메시지 내용
}
