package com.jakomo.app.repository;

import com.jakomo.app.entity.ChatMessage;
import com.jakomo.app.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // 채팅방 내 모든 메시지를 시간순으로 조회
    List<ChatMessage> findByChatRoomOrderBySentAtAsc(ChatRoom chatRoom);
}
