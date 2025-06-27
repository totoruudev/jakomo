// Showroom.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Showroom.css";

const CATEGORY_BTNS = [
    { label: "직영 플래그십", value: "flagship", image: "/images/btn_flagship.gif" },
    { label: "백화점", value: "department", image: "/images/btn_department.jpg" },
    { label: "컬래버스토어", value: "collab", image: "/images/btn_collab.jpg" },
];

export default function Showroom() {
    return (
        <div className="showroom-page container my-5 d-flex flex-column align-items-center">

            {/* 1. 쇼룸 안내 (상단) */}
            <section className="showroom-info mb-5 d-flex flex-column align-items-center">
                <h2 className="fw-bold mb-3 text-center d-flex flex-column align-items-center">자코모 쇼룸 안내
                    <br/><br/>
                <h5 className="fw-bold mb-2 " style={{ maxWidth: 1080, margin: "0 auto" }}>
                    다양한 스타일의 가구를 직접 체험해 보실 수 있는 자코모 쇼룸
                </h5>
                <h5 className="fw-bold mb-5" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    내츄럴 스타일과 모던 스타일의 인테리어 공간에서 만나보는 자코모 소파!
                </h5>
                <img className="mb-5" style={{ width:1080, display: "flex", justifyContent: "center" }} src="/images/showroom/showroom_main.jpg" alt="" />
                </h2>
                <h5 className="fw-bold mb-3">당신의 행복을 디자인하는 소파 전문 브랜드 자코모</h5>
                    
                <p className="mb-3 text-center" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    자코모는 자연환경과 품질을 고려하여 자연친화적인 소재만을 사용하여 왔으며<br />
                    기능적 편리함과 심미적 가치를 높이는 디자인을 위해<br />
                    이태리 밀라노에 디자인 연구소를 설립하여<br />
                    고객 분들께 늘 최고의 제품만을 제공하기 위해 노력해 왔습니다.
                </p>

                <img className="mb-2" style={{ width:980 }} src="/images/showroom/showroom_0.jpg" alt="쇼룸 안내1"  />
                <div className="mb-5" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <img src="/images/showroom/showroom_1.jpg" alt="쇼룸 안내2" style={{ maxWidth: 320 }} />
                    <img src="/images/showroom/showroom_2.jpg" alt="쇼룸 안내3" style={{ maxWidth: 320 }} />
                    <img src="/images/showroom/showroom_3.jpg" alt="쇼룸 안내4" style={{ maxWidth: 320 }} />
                </div>
                <h5 className="fw-bold mb-3">자코모 소파를 300평 규모의 넓은 전시 공간에서 직접 체험하는 자코모 쇼룸</h5>
                <p className="mb-3 text-center" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    층별 컨셉에 따라 다양한 디자인의 신상품과 인기가 많은 상품 군들이 전시되어 있습니다.<br />
                    전시장 내에는 자코모 소파 내부를 개방하여 건강을 생각하는 친환경 자재들을 직접 볼 수 있고,<br />
                    다양한 가죽을 등급별로 전시해 놓아 자코모의 품격이 다른 높은 퀄리티의 가죽을 만나보실 수 있습니다.
                </p>

                <div className="mb-5" style={{ width:980, display: "flex", gap:"10px", flexDirection: "column", alignItems: "center"}}>
                    <img src="/images/showroom/showroom_4.jpg" alt="쇼룸 안내5" style={{ maxWidth: 1080 }} />
                    <img src="/images/showroom/showroom_5.jpg" alt="쇼룸 안내6" style={{ maxWidth: 1080 }} />
                    <img src="/images/showroom/showroom_6.jpg" alt="쇼룸 안내7" style={{ maxWidth: 1080 }} />
                </div>
                <h5 className="fw-bold mb-3"> A동 전시관 1F - 다양한 스타일은 선보이는 전시공간</h5>
                <p className="mb-3 text-center" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    모던 스타일의 구성으로 가구들이 심플하면서 유니크한 느낌이 가득한 공간<br />
                    모든 고객들이 원하는 워너비 공간으로<br />
                    군더더기 없이 깔끔하고 실용적인 기능성 소파들로<br />
                    감각적인 모던 스타일을 연출하실 수 있으며,<br />
                    자코모 가구만의 품격 있는 고급스러움과 편안함을 동시에 느끼실 수 있을 것입니다.<br /><br /><br />
                </p>
                <div className="mb-5" style={{ width:980, display: "flex", gap:"10px", flexDirection: "column", alignItems: "center"}}>
                    <img src="/images/showroom/showroom_7.jpg" alt="쇼룸 안내7" style={{ maxWidth: 1080 }} />
                    <img src="/images/showroom/showroom_8.jpg" alt="쇼룸 안내8" style={{ maxWidth: 1080 }} />
                    <img src="/images/showroom/showroom_9.jpg" alt="쇼룸 안내9" style={{ maxWidth: 1080 }} />
                </div>
                <h5 className="fw-bold mb-3">A동 전시관 2F - 신혼가구와 싱글가구를 위한 전시공간</h5>
                <p className="mb-3 text-center" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    싱글가구 혹은 신혼가구로 걸맞는 여성들의 로망인 북유럽 스타일.<br /><br />
                        자연을 닮은 내추럴 소재와 감각적인 디자인으로 친숙한 북유럽 스타일을 연출하실 수 있으며,<br />
                        다양한 소품들도 함께 전시하고 있어 보다 쉽게 인테리어 하실 수 있도록 준비하였습니다.<br />
                </p>
                    <div className="mb-5" style={{ width: 980, display: "flex", gap: "10px", flexDirection: "column", alignItems: "center" }}>
                        <img src="/images/showroom/showroom_10.jpg" alt="쇼룸 안내10" style={{ maxWidth: 1080 }} />
                        <img src="/images/showroom/showroom_11.jpg" alt="쇼룸 안내11" style={{ maxWidth: 1080 }} />
                        <img src="/images/showroom/showroom_12.jpg" alt="쇼룸 안내12" style={{ maxWidth: 1080 }} />
                    </div>
                <h5 className="fw-bold mb-3">B동 전시관 1F - 온라인에서 인기 있는 베스트 상품을 전시한 공간</h5>
                <p className="mb-3 text-center" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    자코모 추천&베스트 상품들로 다양한 이태리 모던, 유니크, 럭셔리 등의 디자인 가구로 구성.<br />
                    실용적인 기능성 제품과 감각적인 디자인의 상품들이 가격대별로 전시되어있습니다.<br /><br />
                    또한 자사에서 취급하는 다양한 가죽을 직접 만져보실 수 있으며,<br />
                    각 상품별 샘플도 준비되어 있어, 고객님들의 선택의 폭을 넓혔습니다.
                </p>
                <div className="mb-5" style={{ width: 980, display: "flex", gap: "10px", flexDirection: "column", alignItems: "center" }}>
                    <img src="/images/showroom/showroom_13.jpg" alt="쇼룸 안내13" style={{ maxWidth: 1080 }} />
                    <img src="/images/showroom/showroom_14.jpg" alt="쇼룸 안내14" style={{ maxWidth: 1080 }} />
                </div>
                <h5 className="fw-bold mb-3">B동 전시관 2F - 스크래치 상품 / 창고 대방출 상품을 전시한 공간</h5>
                <p className="mb-3 text-center" style={{ maxWidth: 1080, margin: "0 auto" }}>
                    전시상품, 창고 대방출 등 다양한 상품을 GET 할 수 있는 상시 SALE 공간.<br />
                    최대 할인율로 구매할 수 있는 상품을 진열하여 전시 세일 상품을 찾으시는 분들을 위한 B동 전시관입니다.<br />
                    고객분들께서 충분히 만족하실 합리적인 가격으로 준비하였습니다.<br />
                </p>
            </section>

            {/* 2. 카테고리 원형 버튼 (하단) */}
            <section className="showroom-category-btns d-flex gap-5 justify-content-center">
            {CATEGORY_BTNS.map((btn, idx) => (
                <Link
                    to={`/showroom/${btn.value}`}
                    key={idx}
                    className="showroom-circle-btn text-center"
                    tabIndex={0}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <div className="circle-img-wrapper">
                        <img src={btn.image} alt={btn.label} className="circle-img" />
                        <span className="circle-img-label">{btn.label}</span>
                    </div>
                    </Link>
                ))}
        </section>

        </div>
    );
}
