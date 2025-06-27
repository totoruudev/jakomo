// src/components/ReviewList.jsx
import React from "react";

export default function ReviewList({ reviews = [] }) {
    if (reviews.length === 0) {
        return <p className="text-muted">아직 작성된 후기가 없습니다.</p>;
    }

    return (
        <div className="review-list mt-4">
            {reviews.map((r, idx) => (
                <div key={idx} className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <strong>
                                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                            </strong>{" "}
                            <span className="text-muted ms-2">({r.color})</span>
                        </div>
                        <span className="badge bg-secondary">{r.feel}</span>
                    </div>

                    <p className="mb-2">{r.content}</p>

                    {r.image && (
                        <img
                            src={URL.createObjectURL(r.image)}
                            alt="후기 이미지"
                            className="img-thumbnail"
                            style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
