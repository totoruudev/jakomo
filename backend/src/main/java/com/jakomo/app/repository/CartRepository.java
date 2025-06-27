package com.jakomo.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jakomo.app.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUsername(String username);
    void deleteByUsername(String username);	// 주문 완료 후 장바구니 비우기
}
