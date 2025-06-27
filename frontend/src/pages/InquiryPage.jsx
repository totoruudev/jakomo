import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaComments, FaRobot } from "react-icons/fa";
import "./InquiryPage.css";

const MOCK_INQUIRIES = [
    // {
    //   id: 1,
    //   type: "배송",
    //   title: "배송이 언제 오나요?",
    //   content: "주문한 상품의 배송일이 궁금합니다.",
    //   files: ["영수증.pdf"],
    //   date: "2025-06-18",
    //   status: "답변대기",
    //   answer: null,
    // },
];

export default function InquiryPage() {
    const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);

    const handleInquirySubmit = (newInquiry) => {
        setInquiries([
            {
                ...newInquiry,
                id: inquiries.length + 1,
                date: new Date().toISOString().slice(0, 10),
                status: "답변대기",
                answer: null,
            },
            ...inquiries,
        ]);
    };

    return (
        <div className="inquiry-page container my-5 px-3 px-md-5">
            {/* 상단 안내 */}
            <section className="inquiry-header text-center mb-5">
                <h2 className="fw-bold mb-2" style={{ fontSize: "2.1rem", letterSpacing: "-1px" }}>
                    1:1 문의하기
                </h2>
                <div className="inquiry-desc text-muted mb-4" style={{ fontSize: "1.08rem", lineHeight: 1.7 }}>
                    1:1 문의는 영업일 기준 <b>24시간 이내</b> 답변됩니다.<br />
                    <span className="text-secondary">FAQ에서 궁금하신 점을 먼저 확인해보세요.</span>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-2 inquiry-link-btns">
                    <Link
                        to="/support/faq"
                        className="btn btn-outline-primary d-flex align-items-center px-4 py-2"
                    >
                        <FaQuestionCircle className="me-2" /> FAQ 바로가기
                    </Link>
                    <Link
                        to="/support/chat"
                        className="btn btn-outline-primary d-flex align-items-center px-4 py-2"
                    >
                        <FaComments className="me-2" /> 1:1 채팅
                    </Link>
                    <Link
                        to="/support/chatbot"
                        className="btn btn-outline-primary d-flex align-items-center px-4 py-2"
                    >
                        <FaRobot className="me-2" /> 챗봇 문의
                    </Link>
                </div>
                <hr className="mt-4 mb-0" style={{ borderColor: "#eceff3" }} />
            </section>

            {/* 문의 작성폼 */}
            <section className="inquiry-form mb-5">
                <InquiryForm onSubmit={handleInquirySubmit} />
            </section>

            {/* 내 문의 내역 */}
            <section className="inquiry-history">
                <h4 className="mb-3 fw-bold">내 문의 내역</h4>
                {inquiries.length === 0 ? (
                    <div className="text-center text-muted py-5 fs-5">등록된 문의가 없습니다.</div>
                ) : (
                    <ResponsiveInquiryList inquiries={inquiries} />
                )}
            </section>
        </div>
    );
}

// 문의 작성폼
function InquiryForm({ onSubmit }) {
    const [form, setForm] = useState({
        type: "",
        title: "",
        content: "",
        files: [],
        agree: false,
    });
    const [fileError, setFileError] = useState("");

    // 파일 업로드 핸들러
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const oversize = files.find((file) => file.size > 5 * 1024 * 1024);
        if (oversize) {
            setFileError("파일당 최대 5MB까지 첨부할 수 있습니다.");
            return;
        }
        setFileError("");
        setForm((f) => ({ ...f, files }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.type || !form.title || !form.content || !form.agree) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }
        if (fileError) {
            alert("첨부파일을 확인해주세요.");
            return;
        }
        onSubmit(form);
        setForm({ type: "", title: "", content: "", files: [], agree: false });
        e.target.reset();
    };

    return (
        <form className="border p-3 p-md-4 rounded shadow-sm bg-light inquiry-form-outer" onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col-12 col-md-4 mb-2">
                    <label className="inquiry-form-box form-label fw-semibold">문의 유형</label>
                    <select
                        className="form-select"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">선택하세요</option>
                        <option value="주문/결제">주문/결제</option>
                        <option value="배송">배송</option>
                        <option value="취소/환불">취소/환불</option>
                        <option value="상품">상품</option>
                        <option value="기타">기타</option>
                    </select>
                </div>
                <div className="col-12 col-md-8 mb-2">
                    <label className="form-label fw-semibold">제목</label>
                    <input
                        type="text"
                        className="inquiry-form-box form-control"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-semibold">내용</label>
                <textarea
                    className="inquiry-form-box form-control"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows={5}
                    maxLength={1000}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label fw-semibold">
                    첨부파일 (여러개, 파일당 최대 5MB)
                </label>
                <input
                    type="file"
                    className="inquiry-form-box form-control"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                />
                <div className="form-text text-danger">
                    {fileError ||
                        "파일은 여러개 첨부 가능하며, 각 파일 최대 5MB까지 허용됩니다."}
                </div>
            </div>
            <div className="mb-2 text-muted small">
                * 본 문의는 비밀글로 등록되어 관리자와 본인만 확인할 수 있습니다.
            </div>
            <div className="mb-3 form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    id="agreeCheck"
                    required
                />
                <label className="form-check-label" htmlFor="agreeCheck">
                    개인정보 수집 및 이용 동의 (필수)
                </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 w-md-auto">
                문의 등록
            </button>
        </form>
    );
}

// PC/모바일 반응형 문의내역 리스트
function ResponsiveInquiryList({ inquiries }) {
    // 윈도우 width 체크
    const [mobile, setMobile] = useState(window.innerWidth < 800);

    React.useEffect(() => {
        const onResize = () => setMobile(window.innerWidth < 800);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return mobile ? (
        <div className="inquiry-mobile-list">
            {inquiries.map((inq, idx) => (
                <InquiryCard key={inq.id} inquiry={inq} index={inquiries.length - idx} />
            ))}
        </div>
    ) : (
        <div className="table-responsive">
            <table className="table table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th style={{ width: 60 }}>번호</th>
                        <th style={{ width: 110 }}>문의유형</th>
                        <th>제목</th>
                        <th style={{ width: 110 }}>작성일</th>
                        <th style={{ width: 100 }}>상태</th>
                        <th style={{ width: 90 }}>첨부</th>
                        <th style={{ width: 120 }}>답변보기</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((inq, idx) => (
                        <InquiryHistoryRow key={inq.id} inquiry={inq} index={inquiries.length - idx} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function InquiryCard({ inquiry, index }) {
    const [open, setOpen] = useState(false);
    const isAnswered = Boolean(inquiry.answer);

    return (
        <div className="inquiry-card mb-3 shadow-sm rounded" onClick={() => setOpen((o) => !o)}>
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
                <div className="fw-bold">{inquiry.type}</div>
                <div className={isAnswered ? "text-primary" : "text-secondary"}>
                    {isAnswered ? "답변완료" : "답변대기"}
                </div>
            </div>
            <div className="px-3 pb-2">
                <div className="text-truncate fw-semibold" title={inquiry.title}>{inquiry.title}</div>
                <div className="small text-muted">{inquiry.date}</div>
            </div>
            {open && (
                <div className="p-3 bg-light border-top">
                    <div className="mb-2">
                        <strong>문의내용</strong>
                        <div className="border rounded p-2">{inquiry.content}</div>
                    </div>
                    {inquiry.files && inquiry.files.length > 0 && (
                        <div className="mb-2">
                            <strong>첨부파일:</strong>
                            {inquiry.files.map((file, i) => (
                                <span className="ms-2" key={i}>
                                    <span className="text-decoration-underline">{file.name || file}</span>
                                </span>
                            ))}
                        </div>
                    )}
                    {isAnswered && (
                        <div className="mb-2">
                            <strong className="text-primary">관리자 답변</strong>
                            <div className="border rounded p-2">{inquiry.answer}</div>
                        </div>
                    )}
                    {!isAnswered && (
                        <div className="text-muted small">답변이 등록되면 알림을 통해 안내됩니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}

function InquiryHistoryRow({ inquiry, index }) {
    const [open, setOpen] = useState(false);
    const isAnswered = Boolean(inquiry.answer);

    return (
        <>
            <tr className="inquiry-row" style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
                <td>{index}</td>
                <td>{inquiry.type}</td>
                <td className="text-truncate" title={inquiry.title}>
                    {inquiry.title}
                </td>
                <td>{inquiry.date}</td>
                <td>
                    <span className={isAnswered ? "text-primary" : "text-secondary"}>
                        {isAnswered ? "답변완료" : "답변대기"}
                    </span>
                </td>
                <td>
                    {inquiry.files && inquiry.files.length > 0 ? (
                        <span className="badge bg-secondary">{inquiry.files.length}개</span>
                    ) : (
                        "-"
                    )}
                </td>
                <td>
                    {isAnswered ? (
                        <button className="btn btn-sm btn-outline-info">보기</button>
                    ) : (
                        "-"
                    )}
                </td>
            </tr>
            {open && (
                <tr>
                    <td colSpan={7} className="bg-light">
                        <div>
                            <div className="mb-2">
                                <strong>문의내용</strong>
                                <div className="border rounded p-2">{inquiry.content}</div>
                            </div>
                            {inquiry.files && inquiry.files.length > 0 && (
                                <div className="mb-2">
                                    <strong>첨부파일:</strong>
                                    {inquiry.files.map((file, i) => (
                                        <span className="ms-2" key={i}>
                                            <span className="text-decoration-underline">{file.name || file}</span>
                                        </span>
                                    ))}
                                </div>
                            )}
                            {isAnswered && (
                                <div className="mb-2">
                                    <strong className="text-primary">관리자 답변</strong>
                                    <div className="border rounded p-2">{inquiry.answer}</div>
                                </div>
                            )}
                            {!isAnswered && (
                                <div className="text-muted small">답변이 등록되면 알림을 통해 안내됩니다.</div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}
