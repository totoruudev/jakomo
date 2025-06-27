package com.jakomo.app.repository;

import com.jakomo.app.entity.Qna;
import com.jakomo.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    List<Qna> findByUser(User user);
}
