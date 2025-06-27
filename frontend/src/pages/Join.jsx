// src/pages/Join.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { terms1, terms2, optional } from "../data/agreements";
import AgreementSection from "../components/AgreementSection";
import "./Join.css";

export default function Join() {
    const [required1, setRequired1] = useState(false);
    const [required2, setRequired2] = useState(false);
    const [agreeOptional, setAgreeOptional] = useState(false);
    const allAgreed = required1 && required2 && agreeOptional;

    const navigate = useNavigate();

    const handleNext = () => {
        if (!required1 || !required2) {
            alert("필수 약관에 동의하셔야 가입할 수 있습니다.");
            return;
        }
        navigate("/join/form", { state: { agreedOptional: optional } });
    };

    const handleAllAgree = () => {
        const next = !allAgreed;
        setRequired1(next);
        setRequired2(next);
        setAgreeOptional(next);
    };


    return (
        
        <div className="required-container container p-4">
            <div className="form-check mb-4">
                <input
                    type="checkbox"
                    id="agree-all"
                    className="form-check-input"
                    checked={allAgreed}
                    onChange={handleAllAgree}
                />
                <label htmlFor="agree-all" className="form-check-label ms-2 fw-bold">
                    전체 동의(필수항목과 선택항목 전부 동의 됩니다.)
                </label>
            </div>
            <h2>회원가입 약관 동의</h2>
            <AgreementSection
                id="agree-terms1"
                label="[필수] 이용약관 동의"
                checked={required1}
                onChange={() => setRequired1(!required1)}
                content={terms1}
            />
            <AgreementSection
                id="agree-terms2"
                label="[필수] 개인정보 수집 및 이용 동의"
                checked={required2}
                onChange={() => setRequired2(!required2)}
                content={terms2}
            />
            <AgreementSection
                id="agree-optional"
                label="[선택] 마케팅 정보 수신 동의"
                checked={agreeOptional}
                onChange={() => setAgreeOptional(!agreeOptional)}
                content={optional}
            />
            <button className="btn btn-primary mt-4" onClick={handleNext}>다음</button>
        </div>
    );
}