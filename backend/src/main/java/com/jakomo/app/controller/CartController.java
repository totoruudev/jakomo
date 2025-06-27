package com.jakomo.app.controller;

import com.jakomo.app.dto.CartItemRequestDTO;
import com.jakomo.app.entity.Cart;
import com.jakomo.app.service.CartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;


    // 장바구니에 상품 추가
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@AuthenticationPrincipal User user,
                                          @RequestBody CartItemRequestDTO request) {
        Cart item = cartService.addToCart(user.getUsername(), request);
        return ResponseEntity.ok(item);
    }


    // 장바구니 목록 조회
    @GetMapping
    public ResponseEntity<List<Cart>> getCartItems(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCartItems(user.getUsername()));
    }

    // 장바구니 수량 변경
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateQuantity(@PathVariable("id") Long id,
                                               @RequestParam int quantity) {
        cartService.updateQuantity(id, quantity);
        return ResponseEntity.ok().build();
    }

    // 장바구니 항목 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable("id") Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.ok().build();
    }

    // 장바구니 전체 비우기 (선택적)
    @DeleteMapping("/all")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal User user) {
        cartService.clearCart(user.getUsername());
        return ResponseEntity.ok().build();
    }

    // 장바구니 요청 DTO
    @Data
    public static class AddCartRequest {
        private Long productId;
        private int quantity;
    }
}
