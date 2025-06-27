package com.jakomo.app.controller;

import com.jakomo.app.dto.OrderDetailDTO;
import com.jakomo.app.dto.OrderRequestDTO;
import com.jakomo.app.entity.Orders;
import com.jakomo.app.entity.enums.OrderStatus;
import com.jakomo.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 장바구니 기반 주문 생성
    @PostMapping
    public ResponseEntity<Orders> createOrder(@AuthenticationPrincipal User user) {
        Orders order = orderService.createOrderFromCart(user.getUsername());
        return ResponseEntity.ok(order);
    }

    // 바로구매 (단일상품)
    @PostMapping("/buy-now")
    public ResponseEntity<Orders> buyNow(@RequestBody OrderRequestDTO.OrderItemDTO dto,
                                         @AuthenticationPrincipal User user) {
        Orders order = orderService.createSingleOrder(dto, user.getUsername());
        return ResponseEntity.ok(order);
    }

    // 내 주문 목록 (DTO)
    @GetMapping("/my")
    public ResponseEntity<List<OrderDetailDTO>> getMyOrders(@AuthenticationPrincipal User user) {
        List<OrderDetailDTO> orders = orderService.getMyOrdersDTO(user.getUsername());
        return ResponseEntity.ok(orders);
    }

    // 주문 상세 (DTO)
    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> getOrder(@PathVariable Long id,
                                                   @AuthenticationPrincipal User user) {
        OrderDetailDTO dto = orderService.getOrderDTO(id, user.getUsername());
        return ResponseEntity.ok(dto);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable("id") Long id,
                                                  @RequestParam OrderStatus status,
                                                  @AuthenticationPrincipal User user) {
        // 관리자 권한 검증은 추후 구현
        orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok().build();
    }
}