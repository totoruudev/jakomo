import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotice, createNotice, updateNotice } from "../api"; // api.jsx에서 import
import "./NoticeForm.css";

export default function NoticeForm() {
    const { id } = useParams(); // /notice/new or /notice/edit/:id
    const [form, setForm] = useState({
        title: "",
        content: "",
        author: "관리자",
        important: false, // DB 필드명에 맞춤!
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            getNotice(id)
                .then(res => {
                    // 중요: 필드명 맞추기 (pinned → important)
                    const data = res.data;
                    setForm({
                        title: data.title ?? "",
                        content: data.content ?? "",
                        author: data.author ?? "관리자",
                        important: !!data.important, // Boolean 변환
                    });
                })
                .catch(() => setError("공지사항을 불러오지 못했습니다."))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (isEdit) {
                await updateNotice(id, form);
                alert("공지사항이 수정되었습니다!");
            } else {
                await createNotice(form);
                alert("공지사항이 등록되었습니다!");
            }
            navigate("/support/notice");
        } catch (err) {
            setError("저장에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center my-5">로딩 중...</div>;
    if (error) return <div className="text-center my-5 text-danger">{error}</div>;

    return (
        <div className="notice-form-page container my-5">
            <h2 className="notice-title text-center mb-4 fw-bold">
                {isEdit ? "공지사항 수정" : "공지사항 등록"}
            </h2>
            <form className="notice-form border rounded-3 p-4 bg-white" onSubmit={handleSubmit}>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="notice-important"
                        name="important"
                        checked={form.important}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="notice-important">
                        중요공지(상단 고정)
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="notice-title" className="form-label fw-semibold">제목</label>
                    <input
                        id="notice-title"
                        name="title"
                        type="text"
                        className="notice-form-box form-control"
                        value={form.title}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="notice-content" className="form-label fw-semibold">내용</label>
                    <textarea
                        id="notice-content"
                        name="content"
                        className="notice-form-box form-control"
                        value={form.content}
                        onChange={handleChange}
                        required
                        rows={8}
                        maxLength={2000}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">작성자</label>
                    <input
                        type="text"
                        name="author"
                        className="notice-form-box form-control"
                        value={form.author}
                        readOnly
                    />
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {isEdit ? "수정" : "등록"}
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)} disabled={loading}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}
