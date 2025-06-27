import React, { useState } from "react";

export default function MyInfoEdit({ user, onSave, onCancel }) {
    const [name, setName] = useState(user.name);
    const [tel, setTel] = useState(user.tel);

    const handleSubmit = e => {
        e.preventDefault();
        onSave({ ...user, name, tel });
    };

    return (
        <form className="card mb-3" onSubmit={handleSubmit}>
            <div className="card-header">내 정보 수정</div>
            <div className="card-body">
                <div className="mb-2"><b>이메일</b>: {user.email}</div>
                <div className="mb-2">
                    <label>이름</label>
                    <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>전화번호</label>
                    <input className="form-control" value={tel} onChange={e => setTel(e.target.value)} />
                </div>
                <button className="btn btn-primary me-2" type="submit">저장</button>
                <button className="btn btn-secondary" onClick={onCancel} type="button">취소</button>
            </div>
        </form>
    );
}
