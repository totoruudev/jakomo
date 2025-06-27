import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Join from "./pages/Join";
import JoinForm from "./pages/JoinForm"
import Cart from "./pages/CartPage"
import OrderListPage from "./pages/OrderListPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailPage from "./pages/PaymentFailPage";


// 전체상품
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// 프로모션
import Promotion from "./pages/PromotionPage";
import OfflineEvent from "./pages/OfflineEventPage";
// import JaLive from "./pages/JaLivePage";

// 고객후기
import BestReviewPage from "./pages/ReviewPage";
import PhotoReviewPage from "./pages/PhotoReviewPage";
import ReviewWrite from "./pages/ReviewWrite";
import ReviewDetail from "./pages/ReviewDetail";

// 쇼룸안내
import Showroom from "./pages/Showroom";
import Flagship from "./pages/Flagship";
import SRStoreHome from "./pages/SRStoreHome";
import SRStore from "./pages/SRStore";
import CollabStore from "./pages/CollabStore";

// 고객센터 
import CustomerCenter from "./pages/CustomerCenter";
import Notice from "./pages/NoticePage";
import NoticeDetail from "./pages/NoticeDetail";
import NoticeForm from "./pages/NoticeForm";
import FAQ from "./pages/FAQPage";
import Inquiry from "./pages/InquiryPage";
import ChatBot from "./pages/ChatBot";
// import Chat from "./pages/Chat";

export default function App() {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/join" element={<Join />} />
            <Route path="/join/form" element={<JoinForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders/my" element={<OrderListPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/cancel" element={<PaymentFailPage />} />
            <Route path="/payment/fail" element={<PaymentFailPage />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/promotion/online" element={<Promotion />} />
            <Route path="/promotion/offline" element={<OfflineEvent />} />
            {/* <Route path="/promotion/ja-live" element={<JaLive />} /> */}

            {/* 상품별 포토후기/베스트후기 */}
            <Route path="/review/photo" element={<PhotoReviewPage />} />
            <Route path="/review/best" element={<BestReviewPage />} />
            <Route path="/product/:productId/review/photo" element={<PhotoReviewPage />} />
            <Route path="/review/write" element={<ReviewWrite />} />
            <Route path="/product/:productId/review/best" element={<BestReviewPage />} />

            {/* 리뷰 등록/상세 */}
            <Route path="/review/write" element={<ReviewWrite />} />
            <Route path="/review/:reviewId" element={<ReviewDetail />} />

            <Route path="/showroom" element={<Showroom />} />
            <Route path="/showroom/flagship" element={<Flagship />} />
            <Route path="/showroom/srstore" element={<SRStoreHome />} />
            <Route path="/showroom/srstore/sr-store" element={<SRStore />} />
            <Route path="/showroom/collabStore" element={<CollabStore />} />

            <Route path="/support" element={<CustomerCenter />} />

            <Route path="/support/notice" element={<Notice />} />
            <Route path="/support/notice/:id" element={<NoticeDetail />} />
            <Route path="/support/notice/new" element={<NoticeForm />} />
            <Route path="/support/notice/edit/:id" element={<NoticeForm />} />

            <Route path="/support/faq" element={<FAQ />} />
            <Route path="/support/inquiry" element={<Inquiry />} />
            <Route path="/support/chatbot" element={<ChatBot />} />
            {/* <Route path="/support/chat" element={<Chat />} /> */}

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}