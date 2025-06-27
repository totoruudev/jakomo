// src/pages/OfflineEventPage.jsx
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./PromotionPage.css";
import PromotionTabs from "../components/PromotionTabs";
import { getOfflineBanners, getOfflineEvents } from "../api";

export default function OfflineEventPage() {
  const [banners, setBanners] = useState([]);
  const [events, setEvents] = useState({ ongoing: [], ended: [] });
  const [eventTab, setEventTab] = useState("ongoing");

  useEffect(() => {
    getOfflineBanners().then(res => setBanners(res.data || []));
    getOfflineEvents().then(res => setEvents(res.data || { ongoing: [], ended: [] }));
  }, []);

  // 배너
  const renderBanners = () => (
    banners.length >= 2 && (
      <div className="row g-4 mb-5">
        <div className="col-md-8">
          <div className="promo-banner-wrapper large">
            <img src={banners[0].image} alt={banners[0].title} />
          </div>
          <h6 className="mt-3 fw-bold">{banners[0].title}</h6>
          <p className="text-muted small">{banners[0].subtitle}</p>
        </div>
        <div className="col-md-4">
          <div className="promo-banner-wrapper small">
            <img src={banners[1].image} alt={banners[1].title} />
          </div>
          <h6 className="mt-3 fw-bold">{banners[1].title}</h6>
          <p className="text-muted small">{banners[1].subtitle}</p>
        </div>
      </div>
    )
  );

  // 이벤트 카드
  const renderEvents = () => (
    <div className="row g-3">
      {events[eventTab]?.map(item => (
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
  );

  return (
    <div className="promotion-page container my-5">
      <h2 className="fw-bold text-center mb-4">오프라인 쇼룸</h2>
      <PromotionTabs />
      {renderBanners()}
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
        {renderEvents()}
      </section>
    </div>
  );
}
