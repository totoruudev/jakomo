package com.jakomo.app.controller;

import com.jakomo.app.entity.Board;
import com.jakomo.app.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 글 작성
    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        return ResponseEntity.ok(boardService.createBoard(board));
    }

    // 전체 글 목록
    @GetMapping
    public ResponseEntity<List<Board>> getAllBoards() {
        return ResponseEntity.ok(boardService.getAllBoards());
    }

    // 게시글 상세보기 (조회수 증가 포함)
    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoard(@PathVariable("id") Long id) {
        boardService.increaseHits(id);
        return boardService.getBoard(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable("id") Long id,
                                             @RequestBody Board updated) {
        Board result = boardService.updateBoard(id, updated);
        return result != null ? ResponseEntity.ok(result)
                              : ResponseEntity.notFound().build();
    }

    // 글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBoard(@PathVariable("id") Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.ok("삭제 완료");
    }
}
