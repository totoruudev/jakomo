import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { kakaoPayApprove } from "../api"; // 이미 만든 API 함수 사용

export default function PaymentSuccessPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const orderId = params.get("orderId");
        const userId = params.get("userId");
        const pg_token = params.get("pg_token");
        if (orderId && userId && pg_token) {
            // 백엔드에 결제 승인 요청
            kakaoPayApprove(orderId, pg_token, userId)
                .then(() => {
                    // 성공 시 주문 완료 페이지로 이동
                    navigate("/orders/complete");
                })
                .catch(() => {
                    // 실패 시 실패 안내 페이지로
                    navigate("/orders/fail");
                });
        }
    }, [params, navigate]);

    return <div>결제 승인 중입니다. 잠시만 기다려주세요...</div>;
}
