import { Link, useLocation } from "react-router-dom";

export default function PromotionTabs() {
    const location = useLocation();

    return (
        <div className="promotion-tab-buttons d-flex justify-content-center gap-3 mb-5">
            <Link
                to="/promotion/online"
                className={`btn rounded-pill px-4 py-2 fw-semibold ${location.pathname === "/promotion/online" ? "btn-dark text-white" : "btn-light text-muted"
                    }`}
            >
                온라인 공식몰
            </Link>
            <Link
                to="/promotion/offline"
                className={`btn rounded-pill px-4 py-2 fw-semibold ${location.pathname === "/promotion/offline" ? "btn-dark text-white" : "btn-light text-muted"
                    }`}
            >
                오프라인 쇼룸
            </Link>
        </div>
    );
}
