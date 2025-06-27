import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";

export default function Home() {
  const [productItems, setProductItems] = useState([]);
  const [reviewItems, setReviewItems] = useState([]);

  // 상품 데이터 불러오기
  useEffect(() => {
  axios.get("/api/products?limit=6")
    .then(res => {
      console.log("상품 응답:", res.data); // 이거 찍어보고
      setProductItems(res.data);
    })
    .catch(() => setProductItems([]));
  }, []);

  // 베스트 후기 데이터 불러오기
  useEffect(() => {
    axios.get("/api/review/best")
      .then(res => {
        console.log("응답:", res.data);   // 이 줄 추가!
        setReviewItems(res.data);
      })
      .catch(() => setReviewItems([]));
  }, []);

  return (
    <>
      <div className="home-container">
        {/* 1. 캐러셀 슬라이드 공간 확보 */}
        <section className="main-banner">
          <div className="banner-placeholder">[ 메인 슬라이드 자리 ]</div>
        </section>

        {/* 2. 카테고리 링크 버튼 */}
        <section className="category-links">
          <Link to="/products">전체보기</Link>
          <Link to="/products?category=leather">가죽소파</Link>
          <Link to="/products?category=fabric">패브릭소파</Link>
          <Link to="/products?category=living">리빙룸</Link>
          <Link to="/products?category=goods">굿즈관</Link>
        </section>

        {/* === 상품 캐러셀 섹션 === */}
        <section className="home-section">
          <h2 className="section-title">추천 상품</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={3}
            pagination={{ clickable: true }}
            breakpoints={{
              1200: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {Array.isArray(productItems) && productItems.map(item => (
              <SwiperSlide key={item.id}>
                <div className="card">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">
                    <span style={{ color: "#ee4d2d", marginLeft: 8 }}>
                      {item.price2.toLocaleString()}원
                    </span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* === 베스트 포토후기 섹션 === */}
        <section className="home-section">
          <h2 className="section-title">베스트 포토후기</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              480: { slidesPerView: 1.2 },
            }}
          >
            {Array.isArray(reviewItems) && reviewItems.map(item => (
              <SwiperSlide key={item.id}>
                <div className="card">
                  <img src={item.image} alt={item.user} />
                  <p className="user">@{item.user}</p>
                  <p>{item.content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </>
  );
}
