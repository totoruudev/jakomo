// src/pages/CollabStore.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CollabStore.css";

export default function CollabStore() {
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        // 콜라보 배너 (type으로 구분, visible만, 정렬)
        axios
            .get("/api/banners", {
                params: {
                    type: "collab_banner",
                    visible: true,
                    sort: "displayOrder",
                },
            })
            .then((res) => setBanners(res.data))
            .catch((err) => setBanners([]));

        // 콜라보 소파
        axios
            .get("/api/collab-sofas", {
                params: {
                    visible: true,
                    sort: "displayOrder",
                },
            })
            .then((res) => setProducts(res.data))
            .catch((err) => setProducts([]));
    }, []);

    return (
        <div className="collab-store container my-5">
            {/* 1. 타이틀 */}
            <h2 className="fw-bold text-center mb-5">컬래버 스토어</h2>

            {/* 2:1 배너 레이아웃 */}
            <div className="row mb-5 align-items-stretch g-3">
                {/* 왼쪽 배너 - col-md-8 (2/3) */}
                <div className="col-12 col-md-8">
                    <Link to={banners[0]?.link || "#"}>
                        <img
                            src={banners[0]?.image}
                            alt={banners[0]?.title || "왼쪽 배너"}
                            className="img-fluid w-100 h-100 rounded shadow-sm object-fit-cover"
                            style={{ aspectRatio: "2 / 1", minHeight: "100%" }}
                        />
                    </Link>
                </div>

                {/* 오른쪽 배너 - col-md-4 (1/3) / 모바일에서는 숨김 */}
                <div className="d-none d-md-block col-md-4">
                    <Link to={banners[1]?.link || "#"}>
                        <img
                            src={banners[1]?.image}
                            alt={banners[1]?.title || "오른쪽 배너"}
                            className="img-fluid w-100 h-100 rounded shadow-sm object-fit-cover"
                            style={{ aspectRatio: "2 / 1", minHeight: "100%" }}
                        />
                    </Link>
                </div>
            </div>
            <hr />

            {/* 3. 진열된 소파 */}
            <section className="sofa-grid">
                <h3 className="fw-bold mb-4 text-left">진열된 소파</h3>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {products.slice(0, 9).map((item) => (
                        <div className="col" key={item.id}>
                            <div className="card h-100 shadow-sm">
                                {/* 이미지 클릭 시 이동 */}
                                <Link to={item.link || `/products/${item.id}`}>
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt={item.name}
                                        style={{ height: "240px", objectFit: "cover" }}
                                    />
                                </Link>
                                <div className="card-body">
                                    <p className="card-title fw-semibold">{item.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
