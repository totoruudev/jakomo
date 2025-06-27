import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotices, getProfile } from "../api"; // getProfile로 내 role 체크
import "./NoticePage.css";

const PAGE_SIZE = 10;

export default function NoticePage() {
  // Spring JPA Page 객체 구조를 맞추기 위한 state
  const [pageData, setPageData] = useState({
    content: [],
    number: 0,
    totalPages: 1,
    totalElements: 0,
  });
  const [page, setPage] = useState(1); // 1부터 표시(백엔드는 0부터)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  // 공지사항 fetch (axios + api.jsx)
  useEffect(() => {
    setLoading(true);
    setError("");
    getNotices(page - 1, PAGE_SIZE)
      .then(res => setPageData(res.data))
      .catch(() => setError("공지사항 목록을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [page]);

  // 내 정보(권한) fetch (마운트시 1회)
  useEffect(() => {
    getProfile()
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null)); // 로그인 안 한 경우 등
  }, []);

  // 중요공지/일반공지 분리
  const pinnedNotices = pageData.content.filter(n => n.isImportant);
  const normalNotices = pageData.content.filter(n => !n.isImportant);

  const goPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= pageData.totalPages) setPage(pageNum);
  };

  // 권한 없을 때 접근/노출 제어 예시(필요시)
  // const isAdmin = profile && profile.role === "ADMIN";

  return (
    <div className="notice-page container my-5">
      <h2 className="notice-title text-center mb-5 fw-bold">공지사항</h2>
      
      {/* 관리자만 노출: 공지 등록 버튼 */}
      {profile?.role === "ADMIN" && (
        <div className="text-end mb-3">
          <Link to="/support/notice/new" className="btn btn-primary">
            공지 등록
          </Link>
        </div>
      )}

      {error && (
        <div className="text-danger text-center mb-4">{error}</div>
      )}
      <div className="notice-list-header">
        <span className="notice-list-col notice-col-num">번호</span>
        <span className="notice-list-col notice-col-title">제목</span>
        <span className="notice-list-col notice-col-date">날짜</span>
        <span className="notice-list-col notice-col-writer">작성자</span>
        <span className="notice-list-col notice-col-views">조회</span>
      </div>
      <div className="notice-list-body">
        {/* 중요공지 */}
        {pinnedNotices.map((notice) => (
          <div className="notice-list-row pinned" key={notice.id}>
            <span className="notice-list-col notice-col-num">
              <span role="img" aria-label="pin">📌</span>
            </span>
            <span className="notice-list-col notice-col-title">
              <Link to={`/support/notice/${notice.id}`} className="notice-title-link">
                {notice.title}
              </Link>
            </span>
            <span className="notice-list-col notice-col-date">
              {notice.regdate?.slice(0, 10) || ""}
            </span>
            <span className="notice-list-col notice-col-writer">
              {notice.author || "관리자"}
            </span>
            <span className="notice-list-col notice-col-views">
              {notice.views ?? 0}
            </span>
          </div>
        ))}

        {/* 일반공지 */}
        {normalNotices.map((notice, idx) => (
          <div className="notice-list-row" key={notice.id}>
            <span className="notice-list-col notice-col-num">
              {pageData.totalElements - (pageData.number * PAGE_SIZE + idx)}
            </span>
            <span className="notice-list-col notice-col-title">
              <Link to={`/support/notice/${notice.id}`} className="notice-title-link">
                {notice.title}
              </Link>
            </span>
            <span className="notice-list-col notice-col-date">
              {notice.regdate?.slice(0, 10) || ""}
            </span>
            <span className="notice-list-col notice-col-writer">
              {notice.author || "관리자"}
            </span>
            <span className="notice-list-col notice-col-views">
              {notice.views ?? 0}
            </span>
          </div>
        ))}

        {/* 공지 없음 표시 */}
        {pageData.content.length === 0 && !loading && (
          <div className="notice-list-row text-center">
            공지사항이 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="notice-pagination">
        <button className="page-nav-btn" onClick={() => goPage(1)} disabled={page === 1}>
          &laquo;
        </button>
        <button className="page-nav-btn" onClick={() => goPage(page - 1)} disabled={page === 1}>
          &lsaquo;
        </button>
        <div className="page-numbers">
          {Array.from({ length: pageData.totalPages }).map((_, i) => (
            <button
              key={i}
              className={`page-btn${page === i + 1 ? " active" : ""}`}
              onClick={() => goPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button className="page-nav-btn" onClick={() => goPage(page + 1)} disabled={page === pageData.totalPages}>
          &rsaquo;
        </button>
        <button className="page-nav-btn" onClick={() => goPage(pageData.totalPages)} disabled={page === pageData.totalPages}>
          &raquo;
        </button>
      </div>
    </div>
  );
}
