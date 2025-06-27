// src/components/QuestionForm.jsx
import React, { useState } from "react";

export default function QuestionForm({ isLoggedIn, onSubmit }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
        password: "",
        isPrivate: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setForm((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.content || !form.password) {
            alert("모든 항목을 입력해주세요.");
            return;
        }
        onSubmit({ ...form, date: new Date().toLocaleDateString(), status: "답변대기" });
        setForm({ title: "", content: "", password: "", isPrivate: false, });
    };

    if (!isLoggedIn) {
        return <div className="alert alert-warning">※ 상품 문의는 로그인한 회원만 작성할 수 있습니다.</div>;
    }

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="form-label">제목</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="문의 제목을 입력하세요"
                />
            </div>
            <div className="mb-2">
                <label className="form-label">문의 내용</label>
                <textarea
                    name="content"
                    className="form-control"
                    rows="3"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="상품에 대해 궁금한 점을 입력해주세요"
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">비밀번호</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="비밀글 확인용 비밀번호"
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    name="isPrivate"
                    className="form-check-input"
                    id="privateCheck"
                    checked={form.isPrivate}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="privateCheck">
                    비밀글로 설정하기
                </label>
            </div>
            <button type="submit" className="btn btn-dark">문의 등록</button>
        </form>
    );
}
