// src/pages/OrderDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOrderDetail, kakaoPayReady } from "../api";

export default function OrderDetailPage() {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getOrderDetail(orderId)
            .then(res => setOrder(res.data))
            .catch(() => setOrder(null));
    }, [orderId]);

    // 카카오페이 결제 시작
    const handleKakaoPay = async () => {
        setLoading(true);
        try {
            const res = await kakaoPayReady({
                orderId: order.id,
                userId: order.username, // username에 email이 들어가는 구조라면 그대로 사용
                itemName: order.items.map(i => i.product.gname).join(", "),
                amount: order.totalPrice,
            });
            window.location.href = res.data; // 카카오페이 결제창으로 이동
        } catch (err) {
            alert(err.response?.data?.message || "결제 준비 실패");
            setLoading(false);
        }
    };

    if (!order) return <div className="container my-5">주문 정보를 불러올 수 없습니다.</div>;

    return (
        <div className="container my-5">
            <h2>주문 상세</h2>
            {/* ... 주문 상세 표시 생략 ... */}
            <div className="my-4">
                {order.status === "PENDING" && (
                    <button className="btn btn-warning w-100" onClick={handleKakaoPay} disabled={loading}>
                        {loading ? "결제창 이동 중..." : "카카오페이로 결제하기"}
                    </button>
                )}
                {order.status === "PAID" && (
                    <div className="alert alert-success">이미 결제 완료된 주문입니다.</div>
                )}
                {(order.status === "CANCELLED" || order.status === "FAILED") && (
                    <div className="alert alert-danger">결제가 실패했거나 취소된 주문입니다.</div>
                )}
            </div>
            <Link to="/orders/my" className="btn btn-outline-secondary mt-4">목록으로</Link>
        </div>
    );
}
