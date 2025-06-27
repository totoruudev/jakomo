// src/components/QuestionList.jsx
import React from "react";

export default function QuestionList({ questions }) {
    if (questions.length === 0) {
        return <div className="text-muted">등록된 문의가 없습니다.</div>;
    }

    return (
        <ul className="list-group">
            {questions.map((q, idx) => (
                <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
                >
                    <div>
                        <strong>
                            {q.isPrivate && <span className="me-1">🔒</span>}
                            {q.title}
                        </strong>
                        <div className="text-muted small">{q.date}</div>
                    </div>
                    <span
                        className={`badge ${q.status === "답변완료" ? "bg-success" : "bg-secondary"
                            }`}
                    >
                        {q.status}
                    </span>
                </li>
            ))}
        </ul>
    );
}

// // src/components/QuestionList.jsx
// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// export default function QuestionList({ questions }) {
//     const [showModal, setShowModal] = useState(false);
//     const [selectedQuestion, setSelectedQuestion] = useState(null);
//     const [inputPassword, setInputPassword] = useState("");

//     const handleClickQuestion = (question) => {
//         if (question.isPrivate) {
//             setSelectedQuestion(question);
//             setShowModal(true);
//         } else {
//             alert("공개글입니다.");
//             // 공개글일 경우 상세보기 이동 로직 (추후 구현)
//         }
//     };

//     const handleCheckPassword = () => {
//         // TODO: 비밀번호 검증 로직 백엔드와 연동 필요
//         if (inputPassword === selectedQuestion.password) {
//             alert("비밀번호 일치! 내용을 확인하세요.");
//             setShowModal(false);
//             // TODO: 비밀글 상세내용 보기 구현
//         } else {
//             alert("비밀번호가 일치하지 않습니다.");
//         }
//     };

//     return (
//         <>
//             {questions.length === 0 ? (
//                 <div className="text-muted">등록된 문의가 없습니다.</div>
//             ) : (
//                 <ul className="list-group">
//                     {questions.map((q, idx) => (
//                         <li
//                             key={idx}
//                             className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleClickQuestion(q)}
//                         >
//                             <div>
//                                 <strong>
//                                     {q.isPrivate && <span className="me-1">🔒</span>}
//                                     {q.title}
//                                 </strong>
//                                 <div className="text-muted small">{q.date}</div>
//                             </div>
//                             <span
//                                 className={`badge ${
//                                     q.status === "답변완료" ? "bg-success" : "bg-secondary"
//                                 }`}
//                             >
//                                 {q.status}
//                             </span>
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {/* 비밀번호 입력 모달 - 비밀글만 해당 */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>비밀글 열람</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group>
//                             <Form.Label>비밀번호를 입력하세요</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 value={inputPassword}
//                                 onChange={(e) => setInputPassword(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         취소
//                     </Button>
//                     <Button variant="primary" onClick={handleCheckPassword}>
//                         확인
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
