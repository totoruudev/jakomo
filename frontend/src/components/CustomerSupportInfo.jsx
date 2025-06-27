// components/CustomerSupportInfo.jsx
import React from "react";
import "./CustomerSupportInfo.css";

export default function CustomerSupportInfo() {
    return (
        <div className="support-box-wrapper container my-5">
            <div className="row border p-4">
                {/* 전화번호 영역 */}
                <div className="col-md-6 d-flex align-items-center border-end">
                    <div className="support-icon me-4">
                        <img src="/images/icon_phone.png" alt="전화 아이콘" width="60" />
                    </div>
                    <div>
                        <h5 className="fw-bold mb-2">1588-6007</h5>
                        <p className="mb-1">온라인 <span className="text-muted">09:00 ~ 17:30 (월~금/공휴일 제외)</span></p>
                        <p className="mb-1">해피톡 <span className="text-muted">09:00 ~ 17:30 (월~금/공휴일 제외)</span></p>
                        <p className="mb-0">플래그십 스토어 <span className="text-muted">09:00 ~ 19:30 (월~일요일)</span></p>
                    </div>
                </div>

                {/* 계좌 안내 영역 */}
                <div className="col-md-6 d-flex align-items-center">
                    <div className="support-icon me-4">
                        <img src="/images/icon_bank.png" alt="계좌 아이콘" width="60" />
                    </div>
                    <div>
                        <p className="fw-bold mb-1">※ 입금시 주문하신분 성함을 꼭 기재해주세요.</p>
                        <p className="mb-1">하나은행 <span className="text-muted">164-910017-44504</span></p>
                        <p className="mb-0">예금주 <span className="text-muted">(주)자코모</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
