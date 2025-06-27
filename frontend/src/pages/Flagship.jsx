    import React, { useState, useEffect } from "react";
    import "./Flagship.css";

    const SHOWROOMS = [
        {
            name: "남양주 본점",
            address: "경기도 남양주시 오남읍 진건오남로 929번길 8",
            hours: "09:00 - 19:30",
            closed: "연중무휴",
            tel: "031-570-2331",
            image: "/images/showroom_bg_nam.jpg",
        },
        {
            name: "용인점",
            address: "경기도 용인시 처인구 포곡읍 성산로 432",
            hours: "09:00 - 19:30",
            closed: "연중무휴",
            tel: "070-8832-4906",
            image: "/images/showroom_bg_yongin.jpg",
        },
        {
            name: "일산점",
            address: "경기도 고양시 일산동구 고봉로 662",
            hours: "09:00 - 19:30",
            closed: "연중무휴",
            tel: "031-976-9542",
            image: "/images/showroom_bg_ilsan.jpg",
        },
        {
            name: "양산점",
            address: "경상남도 양산시 물금읍 서들로 13",
            hours: "09:00 - 19:30",
            closed: "연중무휴",
            tel: "055-362-7277",
            image: "/images/showroom_bg_yangsan.jpg",
        },
    ];

    export default function Flagship() {
        const [selectedIdx, setSelectedIdx] = useState(0);
        const showroom = SHOWROOMS[selectedIdx];

    useEffect(() => {
        const header = document.querySelector("header");
        if (header) header.classList.add("transparent", "flagship-white");
        const footer = document.querySelector("footer");
        if (footer) footer.style.display = "none";
        const main = document.querySelector(".app-content");
        if (main) {
            main.style.padding = "0";
            main.style.background = "transparent";
            main.style.minHeight = "0";
            main.style.margin = "0";
            main.style.display = "block";   // flex 등의 레이아웃 초기화!
        }
        return () => {
            if (header) header.classList.remove("transparent", "flagship-white");
            if (footer) footer.style.display = "";
            if (main) {
                main.style.padding = "";
                main.style.background = "";
                main.style.minHeight = "";
                main.style.margin = "";
                main.style.display = "";    // 원상복구
            }
        };
    }, []);


        return (
            <div
                className="flagship-main"
                style={{
                    height: "100vh",
                    minHeight: "100vh",
                    backgroundImage: `url(${showroom.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    margin: 0,
                    padding: 0,
                }}
            >
                <div className="flagship-center-text">
                    <h2>
                        자코모의 프리미엄 소파를<br />
                        직접 체험할 수 있는 <span className="text-accent">직영 플래그십</span>
                    </h2>
                    <p>이곳은 당신을 위한 특별한 체험 공간입니다.</p>
                </div>
                <div className="flagship-info-fixed">
                    <div className="flagship-info-inner">
                        <label htmlFor="showroomSelect"
                            className="showroomSelect-title fw-semibold mb-2">지점 선택</label>
                        <div className="flagship-select-wrap">
                            <select
                                id="showroomSelect"
                                className="form-select mb-3"
                                value={selectedIdx}
                                onChange={e => setSelectedIdx(Number(e.target.value))}
                            >
                                {SHOWROOMS.map((r, i) => (
                                    <option value={i} key={r.name}>{r.name}</option>
                                ))}
                            </select>
                        </div>
                        <hr />
                        <dl className="flagship-info-list">
                            <dt>주소</dt>
                            <dd>{showroom.address}</dd>
                            <dt>운영 시간</dt>
                            <dd>{showroom.hours}</dd>
                            <dt>휴무일</dt>
                            <dd>{showroom.closed}</dd>
                            <dt>대표 전화</dt>
                            <dd>{showroom.tel}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
