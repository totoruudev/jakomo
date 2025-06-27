import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // 백엔드 로그인 API 호출
        const res = await axios.post("/api/auth/login", {
            email: form.email,
            password: form.password,
        });

        // ✅ 토큰 저장 (키 이름 통일: accessToken)
        localStorage.setItem("accessToken", res.data.token);

        // ✅ axios 전역 헤더도 즉시 갱신 (1회만)
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        alert("로그인 성공");
        // 로그인 후 메인페이지 이동
        navigate("/");
    } catch (err) {
        alert(
            err.response?.data?.message ||
            "이메일 또는 비밀번호를 확인하세요."
        );
    }
};


    return (
        <div className="login-page container d-flex justify-content-center align-items-center">
            <div className="login-box border p-4 shadow-sm bg-white">
                <div className="text-center mb-5">
                    <img src="/images/icon_jakomo_logo_bk.svg" alt="Jakomo Logo" height="40" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <button type="submit" className="login-btn btn btn-dark mt-4 d-block mx-auto">
                        로그인
                    </button>
                </form>
                <div className="d-flex justify-content-between mt-4">
                    <Link to="/user/find-email" className="text-decoration-none small">
                        이메일 찾기
                    </Link>
                    <Link to="/user/find-password" className="text-decoration-none small">
                        비밀번호 찾기
                    </Link>
                    <Link to="/join" className="text-decoration-none small">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}
