package com.jakomo.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.jakomo.app.entity.User;
import com.jakomo.app.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = userService.register(
                request.email(),
                request.password(),
                request.name(),
                request.tel()
        );
        return ResponseEntity.ok(user);
    }

    // 내 정보 조회 (로그인 사용자)
    @GetMapping("/me")
    public ResponseEntity<User> getMyInfo(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return ResponseEntity.ok(user);
    }

    // 내 정보 수정
    @PutMapping("/me")
    public ResponseEntity<User> updateMyInfo(@AuthenticationPrincipal UserDetails userDetails,
                                             @RequestBody UpdateRequest request) {
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        User updated = userService.updateMyInfo(user.getId(), request.name(), request.tel());
        return ResponseEntity.ok(updated);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // 실제 서버 로직은 없음 – 프론트에서 토큰 삭제
        return ResponseEntity.ok("로그아웃 완료");
    }
    
    // 회원 탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteMyAccount(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        userService.deleteUser(user.getId()); // ← 여기서 id 기반으로 삭제
        return ResponseEntity.noContent().build();
    }

    // 회원가입용 DTO
    public record RegisterRequest(String email, String password, String name, String tel) {}

    // 내 정보 수정용 DTO
    public record UpdateRequest(String name, String tel) {}
}
