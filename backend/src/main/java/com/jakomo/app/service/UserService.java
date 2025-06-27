package com.jakomo.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jakomo.app.entity.User;
import com.jakomo.app.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    public User register(String email, String rawPassword, String name, String tel) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        String encodedPw = passwordEncoder.encode(rawPassword);

        User user = User.builder()
                .email(email)
                .password(encodedPw)
                .name(name)
                .tel(tel)
                .role(User.Role.USER)
                .status(User.Status.ACTIVE)
                .build();

        return userRepository.save(user);
    }

    // 로그인용 사용자 조회
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 내 정보 조회
    public User getMyInfo(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    // 내 정보 수정
    public User updateMyInfo(Long userId, String name, String tel) {
        User user = getMyInfo(userId);
        user.setName(name);
        user.setTel(tel);
        return userRepository.save(user);
    }

    // 회원 탈퇴 (Soft Delete 방식)
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        user.setStatus(User.Status.WITHDRAWN); // 상태를 탈퇴로 변경
        userRepository.save(user);
    }

    // 관리자 - 전체 회원 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 관리자 - 특정 회원 상세 조회
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
    }

    // 관리자 - 회원 정보 수정
    public User updateUserInfo(Long userId, String name, String tel) {
        User user = getUserById(userId);
        user.setName(name);
        user.setTel(tel);
        return userRepository.save(user);
    }

    // 관리자 - 회원 완전 삭제 (Hard Delete 방식)
    @Transactional
    public void deleteUserByAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        userRepository.delete(user);
    }
}
