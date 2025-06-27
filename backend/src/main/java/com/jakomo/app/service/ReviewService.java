package com.jakomo.app.service;

import com.jakomo.app.dto.ReviewDTO;
import com.jakomo.app.entity.Product;
import com.jakomo.app.entity.Review;
import com.jakomo.app.entity.User;
import com.jakomo.app.repository.ProductRepository;
import com.jakomo.app.repository.ReviewRepository;
import com.jakomo.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // =========================
    // ====== 변환 함수 ========
    // =========================

    private ReviewDTO toDTO(Review r) {
        return ReviewDTO.builder()
                .id(r.getId())
                .title(r.getTitle())
                .content(r.getContent())
                .image(r.getImage())
                .rating(r.getRating())
                .views(r.getViews())
                .likes(r.getLikes())
                .comments(r.getComments())
                .user(r.getUser() != null ? r.getUser().getName() : null)
                .regdate(r.getRegdate() != null ? r.getRegdate().toString() : null)
                .productName(r.getProduct() != null ? r.getProduct().getGname() : null)
                .productImage(r.getProduct() != null ? r.getProduct().getImg1() : null)
                .build();
    }

    // =========================
    // ====== 등록/수정 ========
    // =========================

    // 등록시 DTO 반환 (컨트롤러에서 사용)
    public ReviewDTO addReview(String username, Long productId, String title, String image, int rating, String content, boolean isBest) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품 없음"));

        Review review = Review.builder()
                .user(user)
                .product(product)
                .title(title)
                .image(image)
                .rating(rating)
                .content(content)
                .isBest(isBest)
                .views(0)
                .likes(0)
                .comments(0)
                .build();

        return toDTO(reviewRepository.save(review));
    }

    // 수정시 DTO 반환
    public ReviewDTO updateReview(Long reviewId, String title, String image, int rating, String content, boolean isBest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰 없음"));

        review.setTitle(title);
        review.setImage(image);
        review.setRating(rating);
        review.setContent(content);
        review.setBest(isBest);
        // views, likes, comments 등은 별도 증가/감소 메서드에서 관리
        return toDTO(reviewRepository.save(review));
    }

    // =========================
    // ====== 조회 (DTO) ========
    // =========================

    public List<ReviewDTO> getReviewsByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품 없음"));
        return reviewRepository.findByProduct(product)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewDTO> getBestReviews() {
        return reviewRepository.findByIsBestTrue()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewDTO> getBestReviewsByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품 없음"));
        return reviewRepository.findByProductAndIsBestTrue(product)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    // =========================
    // ====== 삭제/기타 ========
    // =========================

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public void incrementViews(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰 없음"));
        review.setViews(review.getViews() + 1);
        reviewRepository.save(review);
    }
}
