// src/pages/PaymentFailPage.jsx
import React from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function PaymentFailPage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    return (
        <div className="container my-5 text-center">
            <h2>결제 실패 / 취소</h2>
            <p>결제가 실패했거나 취소되었습니다.</p>
            {orderId && <Link className="btn btn-primary" to={`/orders/${orderId}`}>주문 상세로 이동</Link>}
            <Link className="btn btn-outline-secondary ms-2" to="/orders/my">주문 목록</Link>
        </div>
    );
}
