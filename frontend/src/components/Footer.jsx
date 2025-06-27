import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* 왼쪽 회사 정보 */}
        <div className="footer-left">
          <img
            src="/images/icon_jakomo_logo_bk.svg"
            alt="JAKOMO 로고"
            className="footer-logo"
          />
          <p>(주)자코모 │ 대표 : 박유신, 박경분</p>
          <p>경기도 남양주시 오남읍 진건오남로 929번길 8</p>
          <p>사업자등록번호 : 132-81-62165 사업자정보확인</p>
          <p>통신판매업신고번호 : 2020-진접오남-0219</p>
          <p>개인정보보호책임자 : 박유신</p>
          <p>팩스번호 : 031-527-8618 │ 이메일 :{" "}
            <a href="mailto:jakomo@jakomo.co.kr" className="text-decoration-none text-dark">
              jakomo@jakomo.co.kr
            </a>
          </p>
        </div>

        {/* 오른쪽 고객센터 및 계좌 */}
        <div className="footer-right">
          <div className="cs-center">
            <strong>고객센터</strong>
            <a href="tel:15886007" className="text-decoration-none text-dark fw-bold">
              1588-6007
            </a>
            <p>평일 09:00 ~ 17:30 (주말 및 공휴일 휴무)</p>
            <p>점심시간 12:00 ~ 13:00</p>
          </div>
          <div className="bank-info">
            <strong>입금계좌안내</strong>
            <p>하나은행 164-910017-44504</p>
            <p>예금주: (주)자코모</p>
            <p>* 입금 시 주문자 성함 필히 기재</p>
          </div>
        </div>
      </div>

      {/* 하단 링크와 카피 */}
      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/brand">브랜드소개</Link>
          <Link to="/terms">이용약관</Link>
          <Link to="/guide">이용안내</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/ads-inquiry">광고 및 제휴 문의</Link>
          <Link to="/b2b">B2B 구매문의</Link>
          <Link to="/personal-payment">개인결제창</Link>
        </div>
        <div className="footer-copy">
          <p>Copyright © 2025. JAKOMO All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
