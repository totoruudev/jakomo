package com.jakomo.app.controller;

import com.jakomo.app.entity.User;
import com.jakomo.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')") // 이 컨트롤러의 모든 메서드는 관리자만 접근
public class AdminController {

    private final UserService userService;

    // 전체 회원 조회
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 특정 회원 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // 회원 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody AdminUpdateRequest dto) {
        User updated = userService.updateUserInfo(id, dto.name(), dto.tel());
        return ResponseEntity.ok(updated);
    }
    // 관리자 - 회원 완전 삭제
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUserByAdmin(@PathVariable("id") Long id) {
        userService.deleteUserByAdmin(id);
        return ResponseEntity.noContent().build();
    }

    // 수정용 DTO
    public record AdminUpdateRequest(String name, String tel) {}
}
