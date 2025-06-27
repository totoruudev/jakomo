import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SRStoreHome.css";

const BACKGROUND_IMAGES = [
    "/images/bg_visual_img_lotte.jpg",
    "/images/bg_visual_img_shinsegae.jpg",
    "/images/bg_visual_img_hyundai.jpg",
    "/images/bg_visual_img_gallery.jpg",
    "/images/bg_visual_img_ipark.jpg"
];

const INTERVAL_MS = 3000; // 4초마다 이미지 교체

export default function SRStoreHome() {
    const [bgIdx, setBgIdx] = useState(0);
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setInterval(() => {
            setBgIdx((idx) => (idx + 1) % BACKGROUND_IMAGES.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer.current);
    }, []);

    return (
        <div
            className="srstore-bg"
            style={{
                backgroundImage: `url(${BACKGROUND_IMAGES[bgIdx]})`,
            }}
        >
            <div className="srstore-overlay" />
            <div className="srstore-center">
                <h5 className="srstore-subtitle">시간이 지나도 변하지 않을<br/>프리미엄이 프리미엄에게</h5>
                <h2 className="srstore-title mb-4 fw-bold">자코모 X 백화점</h2>
                <div>
                    <Link
                        to="/showroom/srstore/sr-store"
                        className="srstore-enter-btn px-5 py-3 fw-bold d-inline-block"
                        style={{ textDecoration: "none" }}
                        >
                        입장하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
