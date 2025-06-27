package com.jakomo.app.service;

import com.jakomo.app.entity.Board;
import com.jakomo.app.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    // 글 작성
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    // 전체 목록 조회
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    // 게시글 상세
    public Optional<Board> getBoard(Long id) {
        return boardRepository.findById(id);
    }

    // 조회수 증가
    public void increaseHits(Long id) {
        boardRepository.findById(id).ifPresent(board -> {
            board.setHits(board.getHits() + 1);
            boardRepository.save(board);
        });
    }

    // 글 수정
    public Board updateBoard(Long id, Board updated) {
        return boardRepository.findById(id).map(board -> {
            board.setTitle(updated.getTitle());
            board.setContent(updated.getContent());
            return boardRepository.save(board);
        }).orElse(null);
    }

    // 글 삭제
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
