import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { getCart } from "../api"; // ← api.jsx에서 함수 import
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [allDropdownOpen, setAllDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // 로그인 상태 반영
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("accessToken"));
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // 장바구니 개수 fetch (로그인시에만)
  useEffect(() => {
    if (isLoggedIn) {
      getCart()
        .then(res => setCartCount(res.data.length || 0))
        .catch(() => setCartCount(0));
    } else {
      setCartCount(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MENU = [
    { id: "products", label: "전체 상품", items: ["가죽소파", "패브릭소파", "리빙룸", "굿즈관"] },
    { id: "promotion", label: "프로모션", items: ["온라인 공식몰", "오프라인 쇼룸"] },
    { id: "review", label: "고객후기", items: ["베스트 포토후기", "포토후기"] },
    { id: "showroom", label: "쇼룸안내", items: ["직영 플래그십", "컬래버스토어"] },
    { id: "support", label: "고객센터", items: ["공지사항", "자주묻는질문", "1:1문의", "챗봇"] }
  ];

  const productsCategoryMap = {
    "가죽소파": "leather",
    "패브릭소파": "fabric",
    "리빙룸": "living",
    "굿즈관": "goods",
  };
  const promotionMap = {
    "온라인 공식몰": "online",
    "오프라인 쇼룸": "offline",
  };
  const reviewMap = {
    "베스트 포토후기": "best-photo",
    "포토후기": "photo",
  };
  const showroomMap = {
    "직영 플래그십": "flagship",
    "컬래버스토어": "collabstore",
  };
  const supportMap = {
    "공지사항": "notice",
    "자주묻는질문": "faq",
    "1:1문의": "inquiry",
    "챗봇": "chatbot",
  };

  function getMenuLink(id, item, isMenuLabel = false) {
    if (isMenuLabel) {
      switch (id) {
        case "products": return "/products";
        case "promotion": return "/promotion/online";
        case "review": return "/review/best";
        case "showroom": return "/showroom";
        case "support": return "/support";
        default: return "/";
      }
    }
    switch (id) {
      case "products":
        if (!item || item === "" || item === "전체보기") return "/products";
        return `/products?category=${productsCategoryMap[item] || ""}`;
      case "promotion":
        return `/promotion/${promotionMap[item] || ""}`;
      case "review":
        return `/review/${reviewMap[item] || ""}`;
      case "showroom":
        return `/showroom/${showroomMap[item] || ""}`;
      case "support":
        return `/support/${supportMap[item] || ""}`;
      default:
        return "/";
    }
  }

  const renderPcMenu = () => (
    <nav className="main-nav-container"
      onMouseEnter={() => setAllDropdownOpen(true)}
      onMouseLeave={() => setAllDropdownOpen(false)}
      onFocus={() => setAllDropdownOpen(true)}
      onBlur={() => setAllDropdownOpen(false)}
      tabIndex={0}
    >
      <ul className={`main-nav d-flex justify-content-center align-items-center${allDropdownOpen ? " all-open" : ""}`}>
        {MENU.map(({ id, label, items }) => (
          <li key={id} className="nav-item position-relative">
            <Link to={getMenuLink(id, items[0], true)} className="nav-link fw-bold d-flex align-items-center">
              {label}
              <span className="nav-underline" />
            </Link>
            <ul className={`dropdown-menu${allDropdownOpen ? " show" : ""}`}>
              {items.map((item, idx) => (
                <li key={idx}>
                  <Link className="dropdown-item" to={getMenuLink(id, item)}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );

  const renderMobileMenu = () => (
    menuOpen && (
      <nav className="mobile-nav-menu py-3">
        <ul className="mobile-nav-list">
          {MENU.map(({ id, label, items }) => (
            <li key={id} className="mobile-nav-item mb-2">
              <button
                className="accordion-header w-100 text-start px-2 py-2 fw-bold d-flex align-items-center"
                onClick={() => setActiveMenu(activeMenu === id ? null : id)}
              >
                {label}
                <span className="ms-auto">{activeMenu === id ? "▲" : "▼"}</span>
              </button>
              {activeMenu === id && (
                <ul className="accordion-menu-list ps-3">
                  {items.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      <Link
                        to={getMenuLink(id, item)}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  );

  return (
    <header>
      <div className="header-container container-xl">
        {/* 상단: 로고, 검색 */}
        <div className="header-top row align-items-center py-2">
          <div className="col-md-6 d-flex align-items-center">
            <Link to="/" className="Home-btn">
              <img src="/images/icon_jakomo_logo_bk.svg" alt="logo" height="32" className="me-3 logo logo-light" />
              <img src="/images/icon_jakomo_logo_wh.svg" alt="logo" height="32" className="me-3 logo logo-dark" />
            </Link>
          </div>
          <div className="col-md-6">
            <div className="search-box">
              <div className="search-inner d-flex align-items-center border-bottom">
                <input type="text" className="form-control border-0 shadow-none" placeholder="검색어를 입력하세요" />
                <FaSearch className="ms-2 search-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 네비 */}
        <div className="header-bottom d-flex align-items-center justify-content-between py-2">
          {/* 모바일 햄버거 */}
          {isMobile && (
            <div className="menu-icon btn btn-link text-dark p-0" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={20} />
            </div>
          )}

          {/* PC 네비게이션 */}
          {!isMobile && renderPcMenu()}

          {/* 유저메뉴 */}
          <div className="user-menu d-flex align-items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/mypage" className="text-dark small">
                  <FaUserCircle className="me-1" /> 마이페이지
                </Link>
                <button
                  type="button"
                  className="btn btn-link text-dark small p-0"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    setIsLoggedIn(false);
                    window.location.href = "/"; // 새로고침 or navigate
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-dark small">
                  <FaUserCircle className="me-1" /> 로그인
                </Link>
                <Link to="/join" className="text-dark small">회원가입</Link>
              </>
            )}
            <Link to="/cart" className="text-dark small position-relative">
              <FaShoppingCart className="me-1" />장바구니
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobile && renderMobileMenu()}
    </header>
  );
}
