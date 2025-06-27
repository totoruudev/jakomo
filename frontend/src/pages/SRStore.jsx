import React, { useState } from "react";
import { SR_STORE_LIST } from "../data/srStoreList";
import "./SRStore.css";

const AREA_LIST = [
    "전체", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주"
];

export default function SRStore() {
    const [keyword, setKeyword] = useState("");
    const [area, setArea] = useState("전체");

    const filtered = SR_STORE_LIST.filter(store => (
        (area === "전체" || store.area === area) &&
        (store.name.includes(keyword) || store.address.includes(keyword))
    ));

    return (
        <div className="srstore-wrapper">
            <div className="srstore-header">
                <h2 className="fw-bold">매장 찾기</h2>
                <p className="text-muted">가까운 자코모 매장을 빠르게 확인하세요.</p>
            </div>
            <div className="srstore-filter row g-2 mb-4 align-items-center">
                <div className="col-12 col-md-3">
                    <select className="form-select" value={area} onChange={e => setArea(e.target.value)}>
                        {AREA_LIST.map(a => <option key={a}>{a}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="매장명 또는 주소 검색"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                </div>
            </div>
            <div className="row g-4">
                {filtered.map(store => (
                    <div key={store.id} className="col-12 col-md-6 col-lg-4">
                        <div className="srstore-card card h-100">
                            <img src={store.img} alt={store.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{store.name}</h5>
                                <p className="card-text">{store.address}</p>
                                <div className="mb-2"><span className="fw-semibold">전화</span> {store.tel}</div>
                                <a href={store.map} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm mt-2">지도 보기</a>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 &&
                    <div className="text-center text-muted py-5">검색 결과가 없습니다.</div>
                }
            </div>
        </div>
    );
}
