package com.jakomo.app.controller;

import com.jakomo.app.entity.Delivery;
import com.jakomo.app.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;

    // 내 배송 목록 조회 (마이페이지)
    @GetMapping("/my")
    public ResponseEntity<List<Delivery>> getMyDeliveries(@AuthenticationPrincipal User user) {
        List<Delivery> deliveries = deliveryService.getMyDeliveries(user.getUsername());
        return ResponseEntity.ok(deliveries);
    }

    // 단일 배송 정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable("id") Long id) {
        Delivery delivery = deliveryService.getDelivery(id);
        return ResponseEntity.ok(delivery);
    }
}
