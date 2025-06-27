import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotice } from "../api";   // ★ api.jsx에서 함수 import
import "./NoticeDetail.css";

export default function NoticeDetail() {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError("");
        getNotice(id)
            .then(res => {
                // 백엔드에서 데이터 포맷 맞춰서 내려줬다고 가정
                setNotice(res.data);
            })
            .catch(err => {
                setError("공지사항을 불러오는 중 오류가 발생했습니다.");
                setNotice(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center my-5">공지사항을 불러오는 중입니다...</div>;
    if (error)   return <div className="text-center my-5 text-danger">{error}</div>;
    if (!notice) return <div className="text-center my-5">공지사항이 존재하지 않습니다.</div>;

    return (
        <div className="notice-detail-page container my-5">
            <h2 className="notice-title text-center mb-4 fw-bold">공지사항</h2>
            <div className="notice-detail-box border rounded-3 p-4 mb-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <div>
                        <span className="fw-semibold fs-5">{notice.title}</span>
                    </div>
                    <div className="notice-detail-meta text-secondary" style={{ fontSize: "0.95rem" }}>
                        <span className="me-3">작성자: {notice.author || "관리자"}</span>
                        <span className="me-3">작성일: {notice.date}</span>
                        <span>조회수: {notice.views ?? 0}</span>
                    </div>
                </div>
                <hr />
                <div className="notice-detail-content" style={{ minHeight: 120, whiteSpace: "pre-line" }}>
                    {notice.content}
                </div>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>목록</button>
                <button className="btn btn-outline-primary" onClick={() => navigate(`/support/notice/edit/${notice.id}`)}>수정</button>
            </div>
        </div>
    );
}
