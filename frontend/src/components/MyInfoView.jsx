import React from "react";

export default function MyInfoView({ user, onEdit }) {
  return (
    <div className="card mb-3">
      <div className="card-header">내 정보</div>
      <div className="card-body">
        <div><b>이메일</b>: {user.email}</div>
        <div><b>이름</b>: {user.name}</div>
        <div><b>전화번호</b>: {user.phone}</div>
        <button className="btn btn-outline-primary mt-3" onClick={onEdit}>정보 수정</button>
      </div>
    </div>
  );
}
