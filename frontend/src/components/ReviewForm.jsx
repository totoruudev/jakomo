import React, { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import { useParams, useNavigate } from "react-router-dom";
import { getProductOptions, addReview } from "../api"; // api 함수 import

export default function ReviewWrite() {
    const { productId } = useParams();
    const [colorOptions, setColorOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("accessToken"));
        getProductOptions(productId)
            .then(res => setColorOptions(res.data.colors || []))
            .catch(() => setColorOptions([]));
    }, [productId]);

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await addReview(formData); // api 함수 사용
            navigate(`/product/${productId}`);
        } catch (e) {
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    return (
        <div className="container py-5">
            <h3 className="fw-bold mb-4">리뷰 등록</h3>
            <ReviewForm
                isLoggedIn={isLoggedIn}
                productId={productId}
                colorOptions={colorOptions}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
