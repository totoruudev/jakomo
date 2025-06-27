import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function ReviewTab() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const location = useLocation();

    const isBest = location.pathname.includes("/best");

    return (
        <div className="review-tab d-flex justify-content-center gap-3 mb-4">
            <button
                className={`btn btn-outline-dark px-4 fw-bold${!isBest ? " active" : ""}`}
                onClick={() => navigate(`/product/${productId}/review/photo`)}
                type="button"
            >
                포토후기
            </button>
            <button
                className={`btn btn-outline-dark px-4 fw-bold${isBest ? " active" : ""}`}
                onClick={() => navigate(`/product/${productId}/review/best`)}
                type="button"
            >
                베스트 포토후기
            </button>
        </div>
    );
}
