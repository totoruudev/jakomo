package com.jakomo.app.controller;

import com.jakomo.app.entity.User;
import com.jakomo.app.service.UserService;
import com.jakomo.app.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 사용자 이메일로 조회
        User user = userService.getUserByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 비밀번호 검증
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            return ResponseEntity.status(401).body("비밀번호가 일치하지 않습니다.");
        }

        // JWT 토큰 발급
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name(),
                1000 * 60 * 60); // 1시간

        // 토큰 응답
        return ResponseEntity.ok(Map.of("token", token));
    }

    // 로그인 요청 DTO
    public record LoginRequest(String email, String password) {}
}
