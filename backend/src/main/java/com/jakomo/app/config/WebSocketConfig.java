package com.jakomo.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 메시지 브로커 구성 (구독용 prefix 설정)
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // 구독 경로 (클라이언트가 받는 주소)
        config.setApplicationDestinationPrefixes("/app"); // 전송 경로 (클라이언트가 보내는 주소)
    }

    // WebSocket 연결 경로 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat") // 실제 접속할 WebSocket 엔드포인트
                .setAllowedOriginPatterns("*") // CORS 허용
                .withSockJS(); // SockJS 지원 (브라우저 호환성 보장)
    }
}
