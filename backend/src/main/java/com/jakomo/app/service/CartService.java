package com.jakomo.app.service;

import com.jakomo.app.dto.CartItemRequestDTO;
import com.jakomo.app.entity.Cart;
import com.jakomo.app.entity.Product;
import com.jakomo.app.repository.CartRepository;
import com.jakomo.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartItemRepository;
    private final ProductRepository productRepository;

    // 장바구니에 상품 추가 (이미 있으면 수량 증가)
    public Cart addToCart(String username, CartItemRequestDTO request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        Optional<Cart> existingItem = cartItemRepository.findByUsername(username).stream()
                .filter(ci -> ci.getProduct().getId().equals(request.getProductId()) &&
                        ci.getSelectedOptions().equals(request.getSelectedOptions()))
                .findFirst();

        if (existingItem.isPresent()) {
            Cart item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            return cartItemRepository.save(item);
        } else {
            Cart newItem = Cart.builder()
                    .username(username)
                    .product(product)
                    .quantity(request.getQuantity())
                    .selectedOptions(request.getSelectedOptions())
                    .build();
            return cartItemRepository.save(newItem);
        }
    }


    // 사용자 장바구니 목록 조회
    public List<Cart> getCartItems(String username) {
        return cartItemRepository.findByUsername(username);
    }

    // 장바구니 수량 변경
    public void updateQuantity(Long cartItemId, int quantity) {
        Cart item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("장바구니 항목이 존재하지 않습니다."));
        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }

    // 장바구니 항목 삭제
    public void deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    // 해당 사용자의 장바구니 전체 삭제 (주문 완료 시 호출)
    public void clearCart(String username) {
        cartItemRepository.deleteByUsername(username);
    }
}
