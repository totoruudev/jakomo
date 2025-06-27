import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaComments } from "react-icons/fa";
import {
    getNotices,
    getFaqs,
    getPromotions,
} from "../api"; // 반드시 axios 기반!
import FAQTabsSection from "../components/FAQTabsSection";
import NoticePromoSection from "../components/NoticePromoSection";
import CustomerSupportInfo from "../components/CustomerSupportInfo";
import "./CustomerCenter.css";

export default function CustomerCenter({ value, onChange, onSearch }) {
    const [noticeList, setNoticeList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [faqList, setFaqList] = useState([]);

    useEffect(() => {
        // 공지사항
        getNotices(0, 5)
            .then(res => setNoticeList(res.data.content || []))
            .catch(() => setNoticeList([]));

        // FAQ 전체 (배열)
        getFaqs()
            .then(res => {
                console.log("getFaqs() 응답:", res.data);  // 여기서 찍힘!
                setFaqList(Array.isArray(res.data) ? res.data : (res.data.content || []));
            })
            .catch(() => setFaqList([]));

        // 프로모션/이벤트
        getPromotions()
            .then(res => {
                // 만약 배열이 아니라면 (예: {content: [...]})로 온다면:
                setEventList(Array.isArray(res.data) ? res.data : (res.data.content || []));
            })
            .catch(() => setEventList([]));
    }, []);

    return (
        <div className="container-xl">
            <div className="customer-center-summary my-4">
                {/* 1. 고객센터 타이틀 */}
                <h2 className="text-center mb-5 fw-bold">고객센터</h2>

                {/* 2. 공지사항/1:1문의/FAQ 요약 박스 */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6 col-md-3">
                        <Link to="/support/notice" className="summary-card">
                            <div className="summary-title text-primary">공지사항</div>
                            <div className="summary-desc text-muted">중요 안내 및 업데이트 확인</div>
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <Link to="/support/faq" className="summary-card">
                            <div className="summary-title text-primary">자주 묻는 질문</div>
                            <div className="summary-desc text-muted">이용자가 자주하는 질문을 찾아보세요</div>
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <Link to="/support/inquiry" className="summary-card">
                            <div className="summary-title text-primary">1:1 문의</div>
                            <div className="summary-desc text-muted">개별 상담 및 문의 접수</div>
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <Link to="/support/chatbot" className="summary-card">
                            <div className="summary-title text-primary d-flex align-items-center">
                                <FaComments className="me-1" />
                                채팅상담
                            </div>
                            <div className="summary-desc text-muted">실시간 AI 상담</div>
                        </Link>
                    </div>
                </div>

                {/* 3. FAQ 검색 */}
                <div className="faq-search-outer">
                    <div className="faq-search-box d-flex align-items-center justify-content-between rounded-4 py-4 px-4">
                        <div className="fw-semibold fs-5 ms-3" style={{ minWidth: 200 }}>
                            자주묻는 질문 검색
                        </div>
                        <form className="flex-grow-1 d-flex align-items-center mx-3"
                        // onSubmit={onSearch}
                        >
                            <input
                                className="customer-search form-control rounded-pill px-4 py-2"
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={value}
                                onChange={onChange}
                            />
                            <button
                                type="submit"
                                className="btn btn-link ms-n4"
                                style={{ zIndex: 1 }}
                                tabIndex={-1}
                            >
                                <FaSearch size={20} className="text-secondary" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* 4. FAQ 탭/목록 */}
                <FAQTabsSection faqList={faqList} />

                <hr />

                {/* 5. 공지사항/프로모션 (하단 2열) */}
                <NoticePromoSection
                    noticeList={noticeList.slice(0, 5)}
                    eventList={eventList.slice(0, 5)}
                />

                {/* 하단 고객센터 박스 */}
                <CustomerSupportInfo />
            </div>
        </div>
    );
}
