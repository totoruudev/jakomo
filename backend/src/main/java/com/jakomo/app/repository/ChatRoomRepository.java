package com.jakomo.app.repository;

import com.jakomo.app.entity.ChatRoom;
import com.jakomo.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // 사용자가 생성한 채팅방 목록
    List<ChatRoom> findByUser(User user);
    // 관리자에게 연결된 채팅방 목록
    List<ChatRoom> findByAdmin(User admin);
}
