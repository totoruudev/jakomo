import React, { useState, useMemo } from "react";
import "./FAQTabsSection.css";

const FAQ_CATEGORIES = [
    { id: "all", label: "전체" },
    { id: "pay", label: "결제/마일리지/이벤트" },
    { id: "general", label: "일반/관리/냄새" },
    { id: "color", label: "색상/패턴/주름" }
];

export default function FAQTabsSection({ faqList = [] }) {
    const [activeTab, setActiveTab] = useState("all");
    const [openId, setOpenId] = useState(null);

    // 카테고리별 + 최신순 필터링 (useMemo로 성능 최적화)
    const filtered = useMemo(() => {
        const arr = Array.isArray(faqList) ? faqList : [];
        const data = activeTab === "all"
        ? arr
        : arr.filter(faq => faq.category === activeTab);
        return [...data].sort((a, b) => b.id - a.id);
    }, [activeTab, faqList]);

    // 카테고리 라벨 가져오기
    const getLabel = id =>
        FAQ_CATEGORIES.find(cat => cat.id === id)?.label || "전체";

    return (
        <section className="faq-tabs-section">
            {/* 탭 바 */}
            <div className="faq-tab-bar">
                {FAQ_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`faq-tab-btn${activeTab === cat.id ? " active" : ""}`}
                        onClick={() => {
                            setActiveTab(cat.id);
                            setOpenId(null);
                        }}
                        type="button"
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
            {/* 헤더 */}
            <div className="faq-list-header">
                <span className="faq-list-col faq-list-col-num">번호</span>
                <span className="faq-list-col faq-list-col-cat">분류</span>
                <span className="faq-list-col faq-list-col-title">내용</span>
            </div>
            {/* 리스트 */}
            <div className="faq-accordion">
                {filtered.length === 0 ? (
                    <div className="faq-empty">등록된 FAQ가 없습니다.</div>
                ) : (
                    filtered.map((faq, idx) => (
                        <div key={faq.id} className="faq-item">
                            <div
                                className={`faq-title-row${openId === faq.id ? " open" : ""}`}
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                tabIndex={0}
                                role="button"
                                aria-expanded={openId === faq.id}
                            >
                                <span className="faq-list-col faq-list-col-num">{filtered.length - idx}</span>
                                <span className="faq-list-col faq-list-col-cat">
                                    {getLabel(faq.category)}
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
                    ))
                )}
            </div>
        </section>
    );
}
