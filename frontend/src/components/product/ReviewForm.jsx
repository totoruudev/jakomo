// src/components/ReviewForm.jsx
import React, { useState } from "react";

export default function ReviewForm({ isLoggedIn = true, onSubmit }) {
    const [review, setReview] = useState({
        rating: 0,
        color: "",
        feel: "",
        content: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            setReview({ ...review, image: e.target.files[0] });
        } else {
            setReview({ ...review, [name]: value });
        }
    };

    const handleRatingSelect = (value) => {
        setReview({ ...review, rating: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("로그인한 회원만 작성 가능합니다.");
            return;
        }
        onSubmit && onSubmit(review); // 외부에 전달
        alert("후기가 등록되었습니다.");
        setReview({ rating: 0, color: "", feel: "", content: "", image: null });
    };

    if (!isLoggedIn) {
        return (
            <div className="alert alert-warning">
                ※ 로그인한 회원만 작성 가능합니다.
            </div>
        );
    }

    return (
        <form className="review-form mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">별점</label>
                <div className="d-flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                            key={num}
                            style={{
                                cursor: "pointer",
                                fontSize: "1.5rem",
                                color: num <= review.rating ? "#ffca28" : "#ccc",
                            }}
                            onClick={() => handleRatingSelect(num)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">구매 색상</label>
                <input
                    type="text"
                    name="color"
                    value={review.color}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">착석감</label>
                <select
                    name="feel"
                    value={review.feel}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">선택</option>
                    <option value="푹신">푹신</option>
                    <option value="보통">보통</option>
                    <option value="약간하드">약간하드</option>
                    <option value="하드">하드</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">후기 내용 (60자 이내)</label>
                <textarea
                    name="content"
                    value={review.content}
                    onChange={handleChange}
                    maxLength={60}
                    className="form-control"
                    rows="2"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">사진 첨부</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <button type="submit" className="btn btn-dark">
                리뷰 등록
            </button>
        </form>
    );
}
