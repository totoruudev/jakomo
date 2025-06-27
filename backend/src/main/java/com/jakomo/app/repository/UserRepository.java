package com.jakomo.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jakomo.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 로그인: 이메일로 사용자 조회
    Optional<User> findByEmail(String email);
    // 회원가입 시 이메일 중복 체크
    boolean existsByEmail(String email);
    // 관리자: 전체 회원 리스트 조회
    List<User> findAll();
    // 관리자: 이름 또는 이메일로 검색 (선택적 확장)
    @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword% OR u.email LIKE %:keyword%")
    List<User> searchByNameOrEmail(String keyword);
}
