package com.jakomo.app.entity.enums;

public enum PaymentStatus {
    READY,     // 결제 요청 준비
    SUCCESS,   // 결제 성공
    FAIL,      // 결제 실패
    CANCEL     // 사용자가 결제 도중 취소
}
