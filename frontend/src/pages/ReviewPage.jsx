import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaSearch, FaPlus } from "react-icons/fa";
import { getBestReviews } from "../api";
import "./ReviewPage.css";
import ReviewTab from "../components/ReviewTab";

const CARDS_PER_PAGE = 9;

export default function ReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getBestReviews()
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, []);

    const handleReviewWrite = () => {
        const isLogin = !!localStorage.getItem("accessToken");
        if (!isLogin) {
            alert("로그인 후 이용 가능합니다.");
            navigate("/login");
            return;
        }
        navigate("/review/write");
    };

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
        <div className="review-page container py-5">
            <div>
                <h2 className="fw-bold text-center mb-4">베스트 포토후기</h2>
                <ReviewTab />
            </div>
            <button
                className="btn btn-dark d-flex align-items-center gap-2"
                onClick={handleReviewWrite}
            >
                <FaPlus /> 포토후기 등록
            </button>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
                {loading && (
                    <div className="text-center py-5 text-secondary w-100">로딩 중...</div>
                )}
                {!loading && paginated.length === 0 && (
                    <div className="text-center py-5 text-secondary w-100">등록된 후기가 없습니다.</div>
                )}
                {!loading && paginated.map((r) => (
                    <div key={r.id} className="col">
                        <Link to={`/review/${r.id}`} className="card review-card h-100 text-decoration-none shadow-sm">
                            {r.image && (
                                <img
                                    src={r.image}
                                    alt="리뷰이미지"
                                    className="card-img-top object-fit-cover"
                                    style={{ height: 180 }}
                                />
                            )}
                            <div className="card-body">
                                <div className="mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < r.rating ? "text-warning" : "text-muted"}
                                        />
                                    ))}
                                </div>
                                <h5 className="card-title fw-bold mb-2">{r.title}</h5>
                                <div className="card-text mb-2 text-truncate-2">{r.content}</div>
                            </div>
                            <div className="card-footer bg-white border-0 d-flex justify-content-between small">
                                <span className="text-secondary">{r.user?.email || "익명"}</span>
                                <span className="text-secondary">{r.regdate?.slice(0, 10)}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

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
