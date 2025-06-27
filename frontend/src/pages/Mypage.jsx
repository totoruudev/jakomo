// src/pages/Mypage.jsx
import React, { useState, useEffect } from "react";
import MyInfoView from "../components/MyInfoView";
import MyInfoEdit from "../components/MyInfoEdit";
import OrderList from "../components/OrderList";
import { getProfile, updateProfile, getMyOrders } from "../api";

export default function Mypage() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getProfile().then(res => setUser(res.data));
        getMyOrders().then(res => setOrders(res.data));
    }, []);

    // 정보 수정 저장
    const handleSave = (editedUser) => {
        updateProfile(editedUser).then(res => {
            setUser(res.data);
            setEditMode(false);
        });
    };

    if (!user) return <div>로딩중...</div>;

    return (
        <div className="container my-5">
            <h2 className="mb-4 fw-bold">마이페이지</h2>
            <div className="row">
                <div className="col-md-6">
                    {editMode
                        ? <MyInfoEdit user={user} onSave={handleSave} onCancel={() => setEditMode(false)} />
                        : <MyInfoView user={user} onEdit={() => setEditMode(true)} />}
                </div>
                <div className="col-md-6">
                    <OrderList orders={orders} />
                </div>
            </div>
        </div>
    );
}
