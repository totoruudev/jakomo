// src/pages/PromotionPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./PromotionPage.css";
import PromotionTabs from "../components/PromotionTabs";
import { getBanners, getPromotions, getEvents } from "../api";

export default function PromotionPage() {
  const [banners, setBanners] = useState([]);
  const [plans, setPlans] = useState([]);
  const [eventTab, setEventTab] = useState("ongoing");
  const [events, setEvents] = useState({ ongoing: [], ended: [] });

  useEffect(() => {
    // 배너
    getBanners("promo_banner")
      .then(res => setBanners(res.data))
      .catch(() => setBanners([]));
    // 기획전
    getPromotions()
      .then(res => setPlans(res.data))
      .catch(() => setPlans([]));
    // 이벤트
    getEvents("online")
      .then(res => setEvents(res.data))
      .catch(() => setEvents({ ongoing: [], ended: [] }));
  }, []);

  return (
    <div className="promotion-page container my-5">
      <h2 className="fw-bold text-center mb-4">온라인 공식몰</h2>
      <PromotionTabs />

      {/* 배너 */}
      {banners.length >= 2 && (
        <div className="row g-4 mb-5">
          <div className="col-md-8">
            <Link to={banners[0].link} className="text-decoration-none text-dark d-block">
              <div className="promo-banner-wrapper large">
                <img src={banners[0].image} alt={banners[0].title} />
              </div>
              <h6 className="mt-3 fw-bold">{banners[0].title}</h6>
              <p className="text-muted small">{banners[0].subtitle}</p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={banners[1].link} className="text-decoration-none text-dark d-block">
              <div className="promo-banner-wrapper small">
                <img src={banners[1].image} alt={banners[1].title} />
              </div>
              <h6 className="mt-3 fw-bold">{banners[1].title}</h6>
              <p className="text-muted small">{banners[1].subtitle}</p>
            </Link>
          </div>
        </div>
      )}

      {/* 기획전 */}
      <section className="promotion-plans mb-5">
        <h4 className="fw-bold mb-3">기획전</h4>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
          }}
        >
          {plans.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-subtitle text-muted">{item.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 이벤트 */}
      <section className="promotion-events">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">이벤트</h4>
          <div>
            <button
              className={`btn btn-sm ${eventTab === "ongoing" ? "btn-dark" : "btn-outline-dark"} me-2`}
              onClick={() => setEventTab("ongoing")}
            >
              진행중
            </button>
            <button
              className={`btn btn-sm ${eventTab === "ended" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setEventTab("ended")}
            >
              종료된 이벤트
            </button>
          </div>
        </div>

        <div className="row g-3">
          {events[eventTab]?.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className={`card h-100 ${eventTab === "ended" ? "grayscale-card" : ""}`}>
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-subtitle text-muted">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 페이징(샘플용, 실제 연동 시 API에 맞춰 구현) */}
      </section>
    </div>
  );
}
