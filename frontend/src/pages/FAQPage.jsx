import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getFaqs,         // 전체 FAQ 목록
    // getFaq,        // FAQ 단건 상세 (사용 안 함)
} from "../api";      // api.jsx 경로에 맞게 조정
import "./FAQPage.css";

// 카테고리
const FAQ_CATEGORIES = [
    { id: "all", label: "전체" },
    { id: "pay", label: "결제/마일리지/이벤트" },
    { id: "general", label: "일반/관리/냄새" },
    { id: "color", label: "색상/패턴/주름" }
];
const CATEGORY_LABELS = Object.fromEntries(FAQ_CATEGORIES.map(cat => [cat.id, cat.label]));

export default function FAQPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [faqList, setFaqList] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [loading, setLoading] = useState(false);

    // FAQ 목록 불러오기 (탭 변경 시마다 호출)
    useEffect(() => {
        setLoading(true);
        // 전체/카테고리별 분기 (엔드포인트 일치하게)
        let promise;
        if (activeTab === "all") {
            promise = getFaqs();
        } else {
            // /support/faq?category=pay 이런 식이면 아래처럼
            promise = getFaqs({ category: activeTab });
        }
        promise
            .then(res => {
                // getFaqs가 .data 리턴이면 res.data, 그냥 data면 res
                const data = res.data || res;
                setFaqList(data);
            })
            .catch(() => setFaqList([]))
            .finally(() => setLoading(false));
        setOpenId(null);
    }, [activeTab]);

    // id 내림차순 최신순 정렬
    const sorted = [...faqList].sort((a, b) => b.id - a.id);

    return (
        <main className="faq-page container py-5">
            <h1 className="faq-title text-center fw-bold mb-4">자주 묻는 질문(FAQ)</h1>
            <div className="faq-desc text-center mb-4 text-muted">
                궁금하신 내용을 아래에서 확인해보세요.<br />
                원하는 답변이 없을 경우 <b>고객센터 1:1 문의</b>를 이용해 주세요.
            </div>

            <div className="faq-link-box text-center mb-4">
                <Link
                    to="/support/inquiry"
                    className="btn btn-primary px-4 py-2 fw-semibold"
                    aria-label="1:1 문의 바로가기"
                >
                    1:1 문의 바로가기
                </Link>
            </div>

            {/* 탭 */}
            <nav className="faq-tab-bar d-flex flex-wrap gap-2 justify-content-center mb-4">
                {FAQ_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`faq-tab-btn${activeTab === cat.id ? " active" : ""}`}
                        onClick={() => setActiveTab(cat.id)}
                        type="button"
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            {/* 헤더 */}
            <div className="faq-list-header d-none d-md-flex">
                <span className="faq-list-col faq-list-col-num">번호</span>
                <span className="faq-list-col faq-list-col-cat">분류</span>
                <span className="faq-list-col faq-list-col-title">내용</span>
            </div>

            {/* 아코디언 */}
            <section className="faq-accordion">
                {loading ? (
                    <div className="faq-empty">불러오는 중...</div>
                ) : sorted.length === 0 ? (
                    <div className="faq-empty">등록된 FAQ가 없습니다.</div>
                ) : (
                    sorted.map((faq, idx) => {
                        const listNum = sorted.length - idx;
                        return (
                            <div key={faq.id} className="faq-item">
                                <div
                                    className={`faq-title-row${openId === faq.id ? " open" : ""}`}
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    tabIndex={0}
                                    role="button"
                                    aria-expanded={openId === faq.id}
                                >
                                    <span className="faq-list-col faq-list-col-num">{listNum}</span>
                                    <span className="faq-list-col faq-list-col-cat d-none d-md-inline">
                                        {CATEGORY_LABELS[faq.category]}
                                    </span>
                                    <span className="faq-list-col faq-list-col-title">{faq.title}</span>
                                    <span className="faq-arrow">{openId === faq.id ? "▲" : "▼"}</span>
                                </div>
                                {openId === faq.id && (
                                    <div className="faq-body">
                                        <div className="faq-question">
                                            <strong className="faq-label-q">Q</strong>
                                            <span className="faq-question-text" style={{ whiteSpace: "pre-line" }}>
                                                {faq.question}
                                            </span>
                                        </div>
                                        <div className="faq-answer">
                                            <strong className="faq-label-a">A</strong>
                                            <span
                                                className="faq-answer-text"
                                                dangerouslySetInnerHTML={{
                                                    __html: (faq.answer || "").replace(/\n/g, "<br>")
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </section>
        </main>
    );
}
