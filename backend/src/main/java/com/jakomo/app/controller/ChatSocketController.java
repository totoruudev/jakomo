package com.jakomo.app.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakomo.app.dto.ChatMessageDTO;
import com.jakomo.app.entity.ChatMessage;
import com.jakomo.app.entity.ChatRoom;
import com.jakomo.app.entity.User;
import com.jakomo.app.repository.ChatMessageRepository;
import com.jakomo.app.repository.ChatRoomRepository;
import com.jakomo.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatSocketController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    
    @PostMapping("/room/create")
    public ResponseEntity<ChatRoom> createRoom(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        ChatRoom room = chatRoomRepository.save(ChatRoom.builder()
            .user(user)
            .build());
        return ResponseEntity.ok(room);
    }


    // 클라이언트가 POST로 메시지를 전송
    @PostMapping("/send")
    public ResponseEntity<ChatMessageDTO> sendMessage(@RequestBody ChatMessageDTO dto) {
        // 1. 채팅방 조회
        ChatRoom chatRoom = chatRoomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        // 2. 메시지 저장
        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(dto.getSender())
                .content(dto.getContent())
                .build();
        chatMessageRepository.save(chatMessage);

        // 3. 저장된 내용 반환
        return ResponseEntity.ok(ChatMessageDTO.builder()
                .roomId(dto.getRoomId())
                .sender(dto.getSender())
                .content(dto.getContent())
                .build());
    }
}
