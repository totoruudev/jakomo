import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaCommentDots, FaCamera, FaSearch, FaPlus } from "react-icons/fa";
import "./PhotoReviewPage.css";
import ReviewTab from "../components/ReviewTab";

const CARDS_PER_PAGE = 9;

const TABS = [
    { key: "best", label: "베스트 포토후기" },
    { key: "photo", label: "포토후기" }
];

export default function PhotoReviewPage() {
    // 상품별 후기면 productId를 url 파라미터에서 받는다고 가정
    const { productId } = useParams();
    const [currentTab, setCurrentTab] = useState("photo");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // 탭/상품 바뀔 때마다 리뷰 불러오기
    useEffect(() => {
        setLoading(true);
        let url = "";
        if (currentTab === "best") {
            url = `/api/reviews/product/${productId}/best`;
        } else {
            url = `/api/reviews/product/${productId}`;
        }
        axios.get(url)
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [productId, currentTab]);

    // 키워드 필터
    const filtered = reviews.filter(
        (r) =>
            (r.title && r.title.includes(keyword)) ||
            (r.content && r.content.includes(keyword)) ||
            (r.user?.email && r.user.email.includes(keyword))
    );

    // 페이지네이션
    const pageCount = Math.ceil(filtered.length / CARDS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

    return (
        <div className="photo-review-page container py-5">
            <div>
                <h2 className="fw-bold text-center mb-4">포토후기</h2>
                <ReviewTab />
                {/* 포토후기 전용 리스트 렌더 */}
            </div>

            {/* 등록 버튼 */}
            {currentTab === "photo" && (
                <div className="d-flex justify-content-end mb-3">
                    <Link to={`/review/write?productId=${productId}`} className="btn btn-dark d-flex align-items-center gap-2">
                        <FaPlus /> 포토후기 등록
                    </Link>
                </div>
            )}

            {/* 카드 리스트 */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
                {loading && (
                    <div className="text-center py-5 text-secondary w-100">로딩 중...</div>
                )}
                {!loading && paginated.length === 0 && (
                    <div className="text-center py-5 text-secondary w-100">등록된 포토후기가 없습니다.</div>
                )}
                {!loading && paginated.map((r) => (
                    <div key={r.id} className="col">
                        <Link to={`/review/${r.id}`} className="card review-thumb-card h-100 text-decoration-none shadow-sm">
                            <div className="img-wrap position-relative">
                                {r.image ? (
                                    <img
                                        src={r.image}
                                        alt="포토후기"
                                        className="card-img-top object-fit-cover"
                                        style={{ height: 210 }}
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: 210 }}>
                                        <FaCamera className="text-secondary fs-1" />
                                    </div>
                                )}
                                {r.isBest && (
                                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">BEST</span>
                                )}
                            </div>
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-dark mb-2 text-truncate">{r.title}</h6>
                                <div className="small text-secondary mb-1">{r.user?.email || "익명"}</div>
                                <div className="d-flex justify-content-between small text-muted">
                                    <span>{r.regdate?.slice(0,10)}</span>
                                    <span>조회 {r.views || 0}</span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center small pt-2">
                                <span className="d-flex align-items-center gap-1">
                                    <FaHeart className="text-danger" /> {r.likes || 0}
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                    <FaCommentDots /> {r.comments || 0}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    {Array.from({ length: pageCount }).map((_, idx) => (
                        <li className={`page-item${page === idx + 1 ? " active" : ""}`} key={idx}>
                            <button className="page-link" onClick={() => setPage(idx + 1)}>
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 검색바 */}
            <form className="row g-2 align-items-center justify-content-center mt-5" onSubmit={e => e.preventDefault()}>
                <div className="col-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="키워드 검색"
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                        style={{ minWidth: 180 }}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-outline-dark">
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
}
