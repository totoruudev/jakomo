// NoticePromoSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NoticePromoSection.css";

export default function NoticePromoSection({ noticeList = [], eventList = [] }) {
    // 날짜 포맷 (yyyy-mm-dd로 자르기)
    const formatDate = d => d ? d.slice(0, 10) : "";

    return (
        <section className="notice-promo-section my-5">
            <div className="row g-4">
                {/* 공지사항 */}
                <div className="col-md-6">
                    <div className="notice-card-wrap">
                        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                            <h3 className="notice-card-title fw-bold mb-0">공지사항</h3>
                            <Link to="/support/notice" className="notice-more-link">VIEW MORE &gt;</Link>
                        </div>
                        <div className="notice-list-box">
                            {noticeList.length === 0 ? (
                                <div className="text-muted text-center py-4">등록된 공지사항이 없습니다.</div>
                            ) : (
                                noticeList.map(item => (
                                    <div className="notice-list-item d-flex justify-content-between align-items-center" key={item.id}>
                                        <span className="notice-title text-truncate">{item.title}</span>
                                        <span className="notice-date text-nowrap">
                                            {formatDate(item.regdate)}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {/* 이벤트/프로모션 */}
                <div className="col-md-6">
                    <div className="notice-card-wrap">
                        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                            <h3 className="notice-card-title fw-bold mb-0">프로모션</h3>
                            <Link to="/promotion/online" className="notice-more-link">VIEW MORE &gt;</Link>
                        </div>
                        <div className="notice-list-box">
                            {eventList.length === 0 ? (
                                <div className="text-muted text-center py-4">진행중인 프로모션이 없습니다.</div>
                            ) : (
                                eventList.map(item => (
                                    <div className="notice-list-item d-flex justify-content-between align-items-center" key={item.id}>
                                        <span className="notice-title text-truncate">{item.title}</span>
                                        <span className="notice-date text-nowrap">
                                            {/* createdAt 또는 date 필드 사용 */}
                                            {formatDate(item.createdAt || item.date)}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
