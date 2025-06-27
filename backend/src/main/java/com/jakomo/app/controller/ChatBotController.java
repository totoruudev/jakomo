package com.jakomo.app.controller;

import com.jakomo.app.dto.ChatBotMessageDTO;
import com.jakomo.app.dto.ChatBotResponseDTO;
import com.jakomo.app.service.ChatBotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ChatBotController {

    private final ChatBotService chatBotService;

    @PostMapping
    public ResponseEntity<ChatBotResponseDTO> chat(@RequestBody ChatBotMessageDTO chatBotMessageDTO) {
        String reply = chatBotService.getCompletion(chatBotMessageDTO);
        return ResponseEntity.ok(new ChatBotResponseDTO(reply));
    }
    
}
