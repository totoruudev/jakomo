// ChatBotMessageDTO.java
package com.jakomo.app.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatBotMessageDTO {
    private String message;
    private Double temperature;
    private Double topP;
    private Integer maxTokens;
    private Double presencePenalty;
    private Double frequencyPenalty;
}
