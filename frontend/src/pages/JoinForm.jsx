// src/pages/JoinForm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Join.css";

export default function JoinForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        tel: ""
    });
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/user/register", form);
            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "회원가입에 실패했습니다."
            );
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-4">회원 정보 입력</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <input type="email" className="join-box form-control" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input type="password" className="join-box form-control" name="password" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">이름</label>
                        <input type="text" className="join-box form-control" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">전화번호</label>
                        <input type="tel" className="join-box form-control" name="tel" value={form.tel} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success">회원가입 완료</button>
                </form>
            </div>
        </div>
    );
}
