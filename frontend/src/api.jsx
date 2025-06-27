// src/api.jsx
import axios from "axios";

// 1. axios 인스턴스 생성 (baseURL은 "/api"로 통일, 포트 필요시 수정)
const api = axios.create({
    baseURL: "/api",
    withCredentials: true, // 쿠키 사용 필요하면 true
});

// 2. 인터셉터: 토큰 자동첨부
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

// 공통 에러 처리(401 등, 필요시 확장)
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

// ------------------------------------------------------------
// [상품(Product) 관련]
export const getProducts = (params) => api.get("/products", { params });                 // 전체 상품 조회
export const getProduct = (id) => api.get(`/products/${id}`);           // 상품 상세조회
export const getProductReviews = (id) => api.get(`/products/${id}/reviews`);
export const addProduct = (data) => api.post("/products", data);        // 상품 등록
export const updateProduct = (id, data) => api.put(`/products/${id}`, data); // 상품 수정
export const getProductQuestions = (id) => api.get(`/products/${id}/questions`);
export const addQuestion = (id, data) => api.post(`/products/${id}/questions`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);     // 상품 삭제

// ------------------------------------------------------------
// [장바구니(Cart) 관련]
export const getCart = () => api.get("/cart");                          // 내 장바구니 목록
export const addToCart = (data) => api.post("/cart/add", data);         // 장바구니에 담기
export const updateCartItem = (id, quantity) => api.put(`/cart/${id}?quantity=${quantity}`); // 수량 변경
export const deleteCartItem = (id) => api.delete(`/cart/${id}`);        // 개별 항목 삭제
export const clearCart = () => api.delete("/cart/all");                 // 전체 비우기


// ------------------------------------------------------------
// [주문(Order) 관련]
export const orderCart = (orderData) => api.post("/orders", orderData);
export const buyNow = (orderData) => api.post("/orders/buy-now", orderData);
// 주문 상세
export const getOrderDetail = (id) => api.get(`/orders/${id}`);
// 내 주문 리스트
export const getMyOrders = () => api.get("/orders/my");
export const createOrder = (data) => api.post("/orders", data);         // 주문 생성

// ------------------------------------------------------------
// [회원/인증(Auth) 관련]
export const register = (data) => api.post("/users/register", data);    // 회원가입
export const login = (data) => api.post("/users/login", data);          // 로그인
export const getProfile = () => api.get("/users/profile");              // 마이페이지(내 정보)
export const getUserList = () => api.get("/users/list");                // 관리자 회원 목록

// ------------------------------------------------------------
// [프로모션/이벤트]
// // 배너(공통)
export const getBanners = (type = "") =>
    api.get(`/banners${type ? `?type=${type}` : ""}`);
// 기획전
export const getPromotions = () => api.get("/promotion");
export const getPromotion = (id) => api.get(`/promotion/${id}`);        // 프로모션 상세
// 이벤트(온라인/오프라인)
export const getEvents = (type) => api.get(`/events?type=${type}`);
export const getOfflineBanners = () => api.get("/banners?type=offline");
export const getOfflineEvents = () => api.get("/events?type=offline");

// ------------------------------------------------------------
// [고객센터/FAQ/공지/문의]
export const getNotices = (page = 0, size = 10) =>
    api.get(`/support/notice?page=${page}&size=${size}`);          // 공지사항 목록
export const getNotice = (id) => api.get(`/support/notice/${id}`);      // 공지 상세
export const createNotice = (data) => api.post("/support/notice", data);
export const updateNotice = (id, data) => api.put(`/support/notice/${id}`, data);
export const deleteNotice = (id) => api.delete(`/support/notice/${id}`);

export const getFaqs = () => api.get("/support/faq");                   // FAQ 목록
export const getFaq = (id) => api.get(`/support/faq/${id}`);            // FAQ 상세

export const getInquiries = () => api.get("/support/inquiry");          // 1:1문의 목록
export const getInquiry = (id) => api.get(`/support/inquiry/${id}`);    // 1:1문의 상세
export const createInquiry = (data) => api.post("/support/inquiry", data);

// ------------------------------------------------------------
// [리뷰/상품후기]
export const getReview = (reviewId) => api.get(`/reviews/${reviewId}`);
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);
export const getBestReviews = () => api.get("/reviews/best");
export const getProductOptions = (productId) => api.get(`/products/${productId}/options`);
export const addReview = (productId, formData) =>
    api.post(`/products/${productId}/reviews`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });


// ------------------------------------------------------------
// 결제 준비: 카카오페이 결제 URL 반환
export const kakaoPayReady = (payload) =>
    api.post("/payment/ready", payload); // payload: {orderId, userId, itemName, amount}

// 결제 승인 처리
export const kakaoPayApprove = (orderId, pg_token, userId) =>
    api.get(`/payment/success`, {
        params: { orderId, pg_token, userId },
    });

// ------------------------------------------------------------
// 12. axios 인스턴스 자체도 필요하면 export 가능
export default api;

