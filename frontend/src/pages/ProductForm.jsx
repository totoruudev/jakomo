import React, { useState } from "react";
import "./ProductForm.css";

export default function ProductForm() {
    const [form, setForm] = useState({
        name: "",
        price1: "",    // 정가
        price2: "",    // 판매가
        category: "",
        subCategory: "",
        colors: [],
        leatherOption: "",
        stoolOption: "",
        image: null,
    });

    // 할인율 계산
    const calcDiscount = () => {
        const p1 = Number(form.price1);
        const p2 = Number(form.price2);
        if (!p1 || !p2 || p1 <= p2) return 0;
        return Math.round(100 - (p2 / p1) * 100);
    };

    const colorOptions = [
        "크림아이보리", "라이트그레이", "라떼", "카멜", "라이트민트",
        "미스티블루", "네이비", "인디핑크", "그린", "오렌지", "블랙",
        "크림화이트", "카키그린"
    ];

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleColorToggle = (color) => {
        setForm((prev) => ({
            ...prev,
            colors: prev.colors.includes(color)
                ? prev.colors.filter((c) => c !== color)
                : [...prev.colors, color],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 백엔드에 보내는 DTO 구조에 맞춰 key 이름 변환 필요
        const data = {
            gname: form.name,
            price1: Number(form.price1),
            price2: Number(form.price2),
            cate: form.category,
            subCategory: form.subCategory,
            colors: form.colors,
            leatherOption: form.leatherOption,
            stoolOption: form.stoolOption,
            // image: form.image 등
        };
        console.log("등록될 상품 DTO:", data);
        alert("상품 정보가 콘솔에 출력되었습니다.");
    };

    return (
        <div className="container my-5">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="mb-3">
                    <label className="form-label">상품명</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">정가</label>
                        <input type="number" className="form-control" name="price1" value={form.price1} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">판매가</label>
                        <input type="number" className="form-control" name="price2" value={form.price2} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3 d-flex align-items-end">
                        <span className="ms-2">
                            {calcDiscount() > 0 && (
                                <span className="text-danger">
                                    {calcDiscount()}% 할인
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">카테고리</label>
                        <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="leather">가죽소파</option>
                            <option value="fabric">패브릭소파</option>
                            <option value="living">리빙룸</option>
                            <option value="goods">굿즈관</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">서브카테고리</label>
                        <input type="text" className="form-control" name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="예: 3인용, 코너형 등 쉼표로 구분" />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">색상</label>
                    <div className="d-flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                            <button
                                type="button"
                                key={color}
                                className={`btn btn-sm ${form.colors.includes(color) ? "btn-success" : "btn-outline-secondary"}`}
                                onClick={() => handleColorToggle(color)}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">전체가죽 적용</label>
                        <select name="leatherOption" className="form-select" value={form.leatherOption} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="미적용">전체가죽 미적용</option>
                            <option value="적용">전체가죽 적용 (+500,000원)</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">스툴 옵션</label>
                        <select name="stoolOption" className="form-select" value={form.stoolOption} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="없음">구매 안함 (+500,000)</option>
                            <option value="일반">일반 스툴 포함 (+700,000)</option>
                            <option value="전체가죽">전체가죽 스툴 포함 (+800,000)</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">상품 이미지</label>
                    <input type="file" className="form-control" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary mt-3">상품 등록</button>
            </form>
        </div>
    );
}
