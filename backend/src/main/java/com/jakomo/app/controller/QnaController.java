package com.jakomo.app.controller;

import com.jakomo.app.dto.QnaRequestDTO;
import com.jakomo.app.entity.Qna;
import com.jakomo.app.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support/inquiry")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;

    // 질문 등록
    @PostMapping
    public ResponseEntity<Qna> createQna(Authentication auth, @RequestBody QnaRequestDTO dto) {
        Qna qna = qnaService.addQna(auth.getName(), dto.getTitle(), dto.getContent());
        return ResponseEntity.ok(qna);
    }

    // 내 질문 목록
    @GetMapping("/my")
    public ResponseEntity<List<Qna>> getMyQna(Authentication auth) {
        return ResponseEntity.ok(qnaService.getMyQna(auth.getName()));
    }

    // QnA 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Qna> getQna(@PathVariable("id") Long id) {
        return ResponseEntity.ok(qnaService.getQna(id));
    }

    // 질문 수정
    @PutMapping("/{id}")
    public ResponseEntity<Qna> updateQna(Authentication auth, @PathVariable("id") Long id,
                                         @RequestBody QnaRequestDTO dto) {
        Qna updated = qnaService.updateQna(id, auth.getName(), dto.getTitle(), dto.getContent());
        return ResponseEntity.ok(updated);
    }

    // 질문 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQna(Authentication auth, @PathVariable("id") Long id) {
        qnaService.deleteQnaSecurely(id, auth.getName());
        return ResponseEntity.ok("삭제 완료");
    }
}
