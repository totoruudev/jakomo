import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, addToCart, buyNow } from "../api";
import "./ProductDetail.css";
// ...생략 (리뷰/문의 컴포넌트 import)

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});

    // 1. 상품 불러오기
    useEffect(() => {
        setLoading(true);
        getProduct(id)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("상품 정보를 불러올 수 없습니다.");
                setLoading(false);
            });
    }, [id]);

    // 옵션 그룹 선택 체크
    const isDisabled = (groupIdx) => {
        if (groupIdx === 0) return false;
        for (let i = 0; i < groupIdx; i++) {
            const prevGroupId = product.optionGroups[i].id;
            if (!selectedOptions[prevGroupId]) return true;
        }
        return false;
    };

    // 2. 장바구니 담기
    const handleAddToCart = async () => {
        try {
            const selectedColor = Object.values(selectedOptions).join(", ");
            // 예시: 옵션 키값에 따라 맞춰서 조립
            const leather = selectedOptions["leather"] === "true";
            const stool = selectedOptions["stool"] === "true";
            const quantity = 1;

            await addToCart({
                productId: product.id,
                color: selectedColor,
                leather,
                stool,
                quantity,
            });
            alert("장바구니에 담겼습니다!");
        } catch (err) {
            alert("장바구니 담기에 실패했습니다.");
        }
    };

    // 3. 바로구매
    const handleBuyNow = async () => {
        try {
            const selectedColor = Object.values(selectedOptions).join(", ");
            const leather = selectedOptions["leather"] === "true";
            const stool = selectedOptions["stool"] === "true";
            const quantity = 1;

            await buyNow({
                productId: product.id,
                quantity,
                selectedOptions: selectedColor,
                leather,
                stool,
            });
            alert("바로구매 완료! 주문이 접수되었습니다.");
            // 주문 성공시 원하는 경로로 이동
            navigate("/orders/my");
        } catch (err) {
            alert("바로구매 실패!");
        }
    };

    // === 이하 생략: ref/스크롤 등 ===

    if (loading) return <div className="text-center my-5">로딩 중...</div>;
    if (error) return <div className="alert alert-danger my-5">{error}</div>;
    if (!product) return <div className="text-center my-5">상품 정보가 없습니다.</div>;

    return (
        <div className="container my-5 product-detail-page">
            {/* 상단(이미지/정보/옵션/버튼) */}
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.image || "/images/noimg.png"}
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: 360 }}
                    />
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p className="text-muted">
                        정가{" "}
                        <del>
                            {(product.price1 ?? 0).toLocaleString()}원
                        </del>
                        {" → "}
                        <span className="text-danger fw-bold">
                            {(product.price2 ?? 0).toLocaleString()}원
                        </span>
                        {product.price1 > 0 && product.price2 > 0 && product.price1 > product.price2 && (
                            <>
                                {" "}
                                (
                                {Math.round(100 - (product.price2 / product.price1) * 100)}
                                % 할인)
                            </>
                        )}
                    </p>
                    {/* === 옵션 그룹 === */}
                    {product.optionGroups && product.optionGroups.length > 0 && product.optionGroups.map((group, groupIdx) => (
                        <div className="mb-3" key={group.id}>
                            <label>{group.groupName}</label>
                            <select
                                className="form-select"
                                value={selectedOptions[group.id] || ""}
                                onChange={e => setSelectedOptions({
                                    ...selectedOptions,
                                    [group.id]: e.target.value,
                                })}
                                disabled={isDisabled(groupIdx)}
                            >
                                <option value="">선택</option>
                                {group.options.map(opt => (
                                    <option key={opt.id} value={opt.id} disabled={opt.isDisabled}>
                                        {opt.name}{opt.price > 0 ? ` (+${opt.price.toLocaleString()}원)` : ""}
                                    </option>
                                ))}
                            </select>
                            {isDisabled(groupIdx) && (
                                <div className="form-text text-danger">※ 이전 옵션을 먼저 선택해주세요.</div>
                            )}
                        </div>
                    ))}

                    {/* === 버튼 === */}
                    <div className="d-flex flex-wrap gap-2 my-3">
                        <button className="btn btn-light" onClick={handleAddToCart}>
                            장바구니
                        </button>
                        <button className="btn btn-dark" onClick={handleBuyNow}>
                            바로구매
                        </button>
                    </div>
                    <div className="d-flex flex-wrap gap-2 my-3">
                        <button className="btn btn-outline-success">네이버페이</button>
                        <button className="btn btn-outline-danger">페이코</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
