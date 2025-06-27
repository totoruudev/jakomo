package com.jakomo.app.entity.enums;

public enum OrderStatus {
    PENDING,        // 주문 접수
    PAID,           // 결제 완료
    PREPARING,      // 상품 준비 중
    DELIVERING,     // 배송 중
    DELIVERED,      // 배송 완료
    CANCELLED,      // 주문 취소
    REFUNDED        // 환불 완료
}
