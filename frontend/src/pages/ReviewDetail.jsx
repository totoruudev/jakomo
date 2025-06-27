import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getReview, deleteReview } from "../api";

export default function ReviewDetail() {
    const { reviewId } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getReview(reviewId)
            .then(res => setReview(res.data))
            .catch(() => setReview(null))
            .finally(() => setLoading(false));
    }, [reviewId]);

    // 리뷰 삭제
    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteReview(reviewId);
            alert("리뷰가 삭제되었습니다.");
            navigate(-1);
        } catch (e) {
            alert("삭제 실패!");
        }
    };

    if (loading) return <div className="container py-5 text-center">로딩 중...</div>;
    if (!review) return <div className="container py-5 text-center text-danger">리뷰를 찾을 수 없습니다.</div>;

    return (
        <div className="container py-5">
            <div className="mb-3">
                <Link to={`/product/${review.product?.id}/review/photo`} className="btn btn-sm btn-outline-secondary">← 목록으로</Link>
            </div>
            <div className="card shadow-sm p-4">
                {review.image && (
                    <img src={review.image} alt="리뷰 이미지" className="mb-3" style={{ maxWidth: 320, borderRadius: 8 }} />
                )}
                <h4 className="fw-bold">{review.title || "리뷰"}</h4>
                <div className="mb-2 text-secondary">
                    {review.user?.email || "익명"} | {review.regdate?.slice(0, 10)}
                </div>
                <div className="mb-2">
                    별점: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <div className="mb-2">
                    색상: {review.color}
                </div>
                <div className="mb-2">
                    착석감: {review.feel}
                </div>
                <div className="mb-3">{review.content}</div>
                {review.isMine && (
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>삭제</button>
                        <Link to={`/review/edit/${review.id}`} className="btn btn-outline-primary btn-sm">수정</Link>
                    </div>
                )}
            </div>
        </div>
    );
}