import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
    orderCart,
} from "../api";
import "./CartPage.css";

export default function CartPage() {
    const [cart, setCart] = useState([]);

    // ✅ 장바구니 불러오기 (axios)
    const fetchCart = () => {
        getCart()
            .then(res => {
                const data = res.data || res;
                const withChecked = data.map(item => ({ ...item, checked: true }));
                setCart(withChecked);
            })
            .catch(err => {
                console.error("장바구니 불러오기 실패", err);
                setCart([]);
            });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // ✅ 체크박스
    const toggleAllCheck = (e) => {
        const checked = e.target.checked;
        setCart(cart.map(item => ({ ...item, checked })));
    };

    const toggleItemCheck = (id) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // ✅ 수량 변경 (서버 반영)
    const changeQuantity = (id, diff) => {
        const item = cart.find(c => c.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.quantity + diff);

        updateCartItem(id, newQty)
            .then(() => {
                setCart(cart.map(c =>
                    c.id === id ? { ...c, quantity: newQty } : c
                ));
            })
            .catch(err => console.error("수량 변경 실패", err));
    };

    // ✅ 삭제
    const deleteItem = (id) => {
        deleteCartItem(id)
            .then(() => {
                setCart(cart.filter(c => c.id !== id));
            })
            .catch(err => console.error("삭제 실패", err));
    };

    // ✅ 선택 삭제 (여러 개 한 번에)
    const deleteSelectedItems = async () => {
        try {
            const idsToDelete = cart.filter(c => c.checked).map(c => c.id);
            await Promise.all(idsToDelete.map(id => deleteCartItem(id)));
            setCart(cart.filter(c => !c.checked));
        } catch (err) {
            console.error("선택삭제 실패", err);
        }
    };

    // ✅ 전체 비우기
    const handleClearCart = async () => {
        if (!window.confirm("장바구니를 모두 비우시겠습니까?")) return;
        try {
            await clearCart();
            setCart([]);
        } catch (err) {
            alert("전체 비우기 실패!");
        }
    };


    // ✅ 주문하기 (예시)
    const handleOrder = async () => {
        try {
            await orderCart();
            alert("주문이 완료되었습니다!");
            window.location.href = "/orders/my";
        } catch (err) {
            alert("오류: " + err.message);
        }
    };

    const allChecked = cart.length > 0 && cart.every(item => item.checked);
    const totalPrice = cart
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.product.price2 * item.quantity, 0);

    return (
        <div className="cart-page container py-5">
            <h2 className="fw-bold text-center mb-5">장바구니</h2>

            <div className="cart-box shadow-lg bg-white rounded-4 p-3 p-md-4 mb-5">
                {/* 상단 */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                    <div>
                        <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={toggleAllCheck}
                            className="form-check-input me-2"
                        />
                        <span className="fw-semibold">전체선택</span>
                        <button
                            className="btn btn-link text-danger ms-3"
                            onClick={deleteSelectedItems}
                            disabled={cart.every(item => !item.checked)}
                            style={{ textDecoration: 'underline' }}
                        >
                            선택삭제
                        </button>
                        <button
                            className="btn btn-link text-danger ms-3"
                            onClick={handleClearCart}
                            style={{ textDecoration: 'underline' }}
                        >
                            전체비우기
                        </button>
                    </div>
                    <Link to="/products" className="btn btn-outline-dark btn-sm">
                        계속 쇼핑하기
                    </Link>
                    {/* 예시: 장바구니에 직접 담기 */}
                    {/* <button className="btn btn-outline-primary ms-2" onClick={handleAddToCart}>
                        임시담기
                    </button> */}
                </div>

                {/* 장바구니 목록 */}
                {cart.length === 0 ? (
                    <div className="text-center py-5 text-secondary">장바구니에 담긴 상품이 없습니다.</div>
                ) : (
                    <ul className="cart-list list-unstyled mb-0">
                        {cart.map(item => (
                            <li key={item.id} className={`cart-item rounded-3 p-3 p-md-4 mb-3 ${item.checked ? "" : "bg-light"}`}>
                                <div className="row align-items-center g-2">
                                    <div className="col-auto">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleItemCheck(item.id)}
                                            className="form-check-input"
                                        />
                                    </div>
                                    <div className="col-3 col-md-2">
                                        <img src={item.product.image} alt={item.product.name} className="cart-thumb rounded-3 shadow-sm" />
                                    </div>
                                    <div className="col-9 col-md-4 text-start">
                                        <div className="fw-bold">{item.product.name}</div>
                                        <div className="small text-secondary mb-1">{item.selectedOptions}</div>
                                        <Link to={`/products/${item.product.id}`} className="badge bg-secondary-subtle text-dark small">
                                            상세보기
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-2">
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            <button
                                                className="qty-btn"
                                                onClick={() => changeQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => changeQuantity(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-2 fw-bold fs-5 text-primary text-center">
                                        {(item.product.price2 * item.quantity).toLocaleString()}원
                                    </div>
                                    <div className="col-12 col-md-2 text-center mt-2 mt-md-0">
                                        <button className="btn btn-sm btn-outline-danger px-3" onClick={() => deleteItem(item.id)}>
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 결제 요약 */}
            <div className="cart-summary-box mx-auto mb-5">
                <div className="cart-summary-inner rounded-4 shadow-sm bg-white text-center p-4">
                    <h5 className="fw-bold mb-3">결제 예정 금액</h5>
                    <div className="display-6 text-primary fw-bold mb-3">{totalPrice.toLocaleString()}원</div>
                    <button
                        className="btn btn-lg btn-success w-100 fw-bold"
                        disabled={totalPrice === 0}
                        onClick={handleOrder}
                    >
                        주문하기
                    </button>
                </div>
            </div>
        </div>
    );
}
