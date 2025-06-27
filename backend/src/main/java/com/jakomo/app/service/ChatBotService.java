package com.jakomo.app.service;

import com.jakomo.app.dto.ChatBotMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatBotService {

    private final ChatClient chatClient;

    // 예제 구조에 맞춰 옵션 적용!
    public String getCompletion(ChatBotMessageDTO request) {
        ChatOptions options = ChatOptions.builder()
                .temperature(request.getTemperature())
                .topP(request.getTopP())
                .maxTokens(request.getMaxTokens())
                .presencePenalty(request.getPresencePenalty())
                .frequencyPenalty(request.getFrequencyPenalty())
                .build();

        return chatClient.prompt()
                .user(request.getMessage())
                .options(options)
                .call()
                .content();
    }
}