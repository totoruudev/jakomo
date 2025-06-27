package com.jakomo.app.repository;

import com.jakomo.app.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByUsernameOrderByCreatedAtDesc(String username);
}
