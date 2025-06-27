package com.jakomo.app.controller;

import com.jakomo.app.dto.ReviewDTO;
import com.jakomo.app.dto.ReviewRequestDTO;
import com.jakomo.app.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 리뷰 등록
    @PostMapping
    public ResponseEntity<ReviewDTO> addReview(
            Authentication authentication,
            @RequestBody ReviewRequestDTO dto) {

        String username = authentication.getName();
        ReviewDTO review = reviewService.addReview(
                username, dto.getProductId(),
                dto.getTitle(), dto.getImage(),
                dto.getRating(), dto.getContent(), dto.isBest()
        );
        return ResponseEntity.ok(review);
    }

    // 상품별 전체 리뷰
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDTO>> getReviews(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }

    // 상품별 베스트 리뷰
    @GetMapping("/product/{productId}/best")
    public ResponseEntity<List<ReviewDTO>> getBestReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getBestReviewsByProduct(productId));
    }

    // 전체 베스트 리뷰
    @GetMapping("/best")
    public ResponseEntity<List<ReviewDTO>> getBestReviews() {
        return ResponseEntity.ok(reviewService.getBestReviews());
    }

    // 리뷰 수정
    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody ReviewRequestDTO dto) {

        ReviewDTO updated = reviewService.updateReview(
                id, dto.getTitle(), dto.getImage(),
                dto.getRating(), dto.getContent(), dto.isBest()
        );
        return ResponseEntity.ok(updated);
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable("id") Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("삭제 완료");
    }

    // (선택) 리뷰 조회수 증가 엔드포인트
    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementViews(@PathVariable Long id) {
        reviewService.incrementViews(id);
        return ResponseEntity.ok().build();
    }
}
