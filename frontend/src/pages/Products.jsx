// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../api"; // 👈 axios 인스턴스에서 불러옴
import "swiper/css";
import "./Products.css";

export default function Products() {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedKeyword, setSelectedKeyword] = useState("ALL");
    const itemsPerPage = 20;

    const category = new URLSearchParams(location.search).get("category") || "all";

    const categories = [
        { label: "전체", value: "all" },
        { label: "가죽소파", value: "leather" },
        { label: "패브릭소파", value: "fabric" },
        { label: "리빙룸", value: "living" },
        { label: "굿즈관", value: "goods" },
    ];

    const getSubCategoryKeywords = (category) => {
        switch (category) {
            case "leather":
            case "fabric":
                return [
                    { label: "전체", value: "ALL" },
                    { label: "1인", value: "1" },
                    { label: "2인", value: "2" },
                    { label: "3인", value: "3" },
                    { label: "3.5인", value: "3.5" },
                    { label: "4인", value: "4" },
                    { label: "6인", value: "6" },
                    "카우치형",
                    "코너형",
                    "리클라이너",
                    "헤드레스트",
                    "구성품"
                ];
            case "living":
                return [
                    { label: "전체", value: "ALL" },
                    { label: "1인체어", value: "1인체어" },
                    { label: "거실&서랍장", value: "거실&서랍장" },
                    { label: "소파테이블", value: "소파테이블" },
                    { label: "오토만", value: "오토만" },
                    "기타"
                ];
            case "goods":
                return [
                    { label: "전체", value: "ALL" },
                    { label: "가방", value: "가방" },
                    "기타"
                ];
            default:
                return [
                    { label: "전체", value: "ALL" },
                    { label: "1인", value: "1" },
                    { label: "2인", value: "2" },
                    { label: "3인", value: "3" },
                    { label: "3.5인", value: "3.5" },
                    { label: "4인", value: "4" },
                    { label: "6인", value: "6" },
                    "카우치형",
                    "코너형",
                    "리클라이너",
                    "헤드레스트",
                    "구성품"
                ];
        }
    };

    // 카테고리 변경 시 서브 카테고리 필터 초기화
    useEffect(() => {
        setSelectedKeyword("ALL");
    }, [category]);

    // ⭐ DB 연동 axios로 상품 목록 불러오기
    useEffect(() => {
        // API에 전달할 params 준비
        const params = {};
        if (category !== "all") params.category = category;
        if (selectedKeyword && selectedKeyword !== "ALL") params.keyword = selectedKeyword;

        getProducts(params)  // getProducts({category, keyword}) 호출
            .then(res => {
                // API 구조에 따라 다르니, 예시로 res.data 배열로 처리
                setProducts(res.data);
                setCurrentPage(1);
            })
            .catch(err => {
                setProducts([]);
            });
    }, [category, selectedKeyword]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="products-page">
            {/* 상단 카테고리 필터 */}
            <div className="d-flex justify-content-center flex-wrap gap-2 my-4 products-main-category">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        className={`btn ${cat.value === category ? "btn-dark" : "btn-outline-dark"} me-1 mb-2`}
                        onClick={() => navigate(`/products?category=${cat.value}`)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* 서브카테고리 키워드 필터 */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4 products-sub-category">
                {getSubCategoryKeywords(category).map((item) => {
                    const value = typeof item === "string" ? item : item.value;
                    const label = typeof item === "string" ? item : item.label;

                    return (
                        <button
                            key={value}
                            className={`btn btn-sm btn-animate ${selectedKeyword === value ? "active" : ""}`}
                            onClick={() => setSelectedKeyword(value)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* 상품 목록 */}
            <div className="container">
                <div className="row">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => {
                            console.log("ProductCard item:", item); // ← 여기에 추가
                            return (
                                <div
                                    key={item.id}
                                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                                >
                                    <ProductCard item={item} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center my-5">
                            <p>해당 조건에 맞는 상품이 없습니다.</p>
                        </div>
                    )}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                        <ul className="pagination">
                            {[...Array(totalPages)].map((_, idx) => (
                                <li
                                    key={idx + 1}
                                    className={`page-item ${idx + 1 === currentPage ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}