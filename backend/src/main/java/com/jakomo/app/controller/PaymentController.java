package com.jakomo.app.controller;

import com.jakomo.app.entity.Orders;
import com.jakomo.app.entity.Payment;
import com.jakomo.app.repository.OrderRepository;
import com.jakomo.app.repository.PaymentRepository;
import com.jakomo.app.service.PaymentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    // 결제 준비 요청 (카카오페이 결제 페이지 URL 반환)
    @PostMapping("/ready")
    public ResponseEntity<String> ready(@RequestBody PaymentReadyRequest request) {
        String redirectUrl = paymentService.kakaoPayReady(
                request.getOrderId(),
                request.getUserId(),
                request.getItemName(),
                request.getAmount()
        );
        return ResponseEntity.ok(redirectUrl);
    }

    // 결제 승인 (프론트엔드에서 호출)
    @GetMapping("/success")
    public ResponseEntity<String> success(
            @RequestParam("orderId") Long orderId,
            @RequestParam("pg_token") String pg_token,
            @RequestParam("userId") String userId
    ) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문이 존재하지 않습니다."));
        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() -> new RuntimeException("결제 정보를 찾을 수 없습니다."));
        paymentService.kakaoPayApprove(
                payment.getTransactionId(),
                pg_token,
                orderId,
                userId
        );
        return ResponseEntity.ok("결제 성공 및 배송 생성 완료");
    }


    // 결제 취소 콜백
    @GetMapping("/cancel")
    public ResponseEntity<String> cancel(@RequestParam Long orderId) {
        paymentService.failPayment(orderId);
        return ResponseEntity.ok("결제 취소 처리 완료");
    }

    // 결제 실패 콜백
    @GetMapping("/fail")
    public ResponseEntity<String> fail(@RequestParam Long orderId) {
        paymentService.failPayment(orderId);
        return ResponseEntity.ok("결제 실패 처리 완료");
    }

    @Data
    public static class PaymentReadyRequest {
        private Long orderId;
        private String userId;
        private String itemName;
        private int amount;
    }
}
