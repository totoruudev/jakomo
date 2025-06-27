package com.jakomo.app.service;

import com.jakomo.app.entity.Qna;
import com.jakomo.app.entity.User;
import com.jakomo.app.repository.QnaRepository;
import com.jakomo.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaService {

    private final QnaRepository qnaRepository;
    private final UserRepository userRepository;

    // 질문 등록
    public Qna addQna(String username, String title, String content) {
        User user = getUserByUsername(username);

        Qna qna = Qna.builder()
                .user(user)
                .title(title)
                .content(content)
                .build();

        return qnaRepository.save(qna);
    }

    // 전체 목록
    public List<Qna> getAllQna() {
        return qnaRepository.findAll();
    }

    // 사용자별 질문 목록
    public List<Qna> getMyQna(String username) {
        User user = getUserByUsername(username);
        return qnaRepository.findByUser(user);
    }

    // 상세 조회
    public Qna getQna(Long id) {
        return qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QnA 없음"));
    }

    // 관리자 답변 등록
    public Qna answerQna(Long id, String answer) {
        Qna qna = getQna(id);
        qna.setAnswer(answer);
        qna.setAnswered(true);
        return qnaRepository.save(qna);
    }

    // 삭제 (작성자 본인 or 관리자만 허용)
    public void deleteQnaSecurely(Long id, String requesterUsername) {
        Qna qna = getQna(id);
        User requester = getUserByUsername(requesterUsername);

        boolean isAdmin = requester.getRole().equals("ROLE_ADMIN");
        boolean isOwner = qna.getUser().getEmail().equals(requesterUsername);

        if (!isAdmin && !isOwner) {
            throw new AccessDeniedException("QnA 삭제 권한이 없습니다.");
        }

        qnaRepository.deleteById(id);
    }
    
    // 질문 수정 (작성자 본인인지 검증)
    public Qna updateQna(Long id, String username, String title, String content) {
        Qna qna = getQna(id);                     // 기존 메서드 활용
        if (!qna.getUser().getEmail().equals(username)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }
        qna.setTitle(title);
        qna.setContent(content);
        return qnaRepository.save(qna);
    }


    // 내부 공통 유저 로딩
    private User getUserByUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));
    }
}
