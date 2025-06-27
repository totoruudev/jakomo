import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { getProductOptions, addReview } from "../api";

export default function ReviewWrite() {
    const { productId } = useParams();
    const [colorOptions, setColorOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("accessToken"));
        getProductOptions(productId)
            .then(res => setColorOptions(res.data.colors || []))
            .catch(() => setColorOptions([]));
    }, [productId]);

    const handleSubmit = async (formData) => {
        try {
            await addReview(productId, formData);
            alert("리뷰가 등록되었습니다.");
            navigate(`/product/${productId}/review/photo`);
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
