import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api";   // api.js에서 함수 import

export default function OrderListPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders()
            .then(res => setOrders(res.data))
            .catch(err => setOrders([]));  // 에러처리(필요시 콘솔 등)
    }, []);

    return (
        <div className="container my-5">
            <h2>내 주문 내역</h2>
            {orders.length === 0 ? (
                <p className="text-secondary">주문 내역이 없습니다.</p>
            ) : (
                <ul className="list-group">
                    {orders.map(order => (
                        <li key={order.id} className="list-group-item">
                            <Link to={`/orders/${order.id}`}>
                                주문번호 #{order.id} - {order.totalPrice.toLocaleString()}원 ({order.status})
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
