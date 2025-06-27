package com.jakomo.app.repository;

import com.jakomo.app.entity.Review;
import com.jakomo.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
    List<Review> findByProductAndIsBestTrue(Product product); // 베스트 리뷰만
    List<Review> findByIsBestTrue(); // 전체 베스트 리뷰
}
