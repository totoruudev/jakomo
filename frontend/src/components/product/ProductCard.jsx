// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ item }) {
    return (
        <Link
            to={`/products/${item.id}`}
            className="product-card-link text-decoration-none text-dark"
        >
            <div className="card h-100 product-card shadow-sm">
                <img
                    src={item.image || "/images/noimg.png"}
                    alt={item.name}
                    className="card-img-top product-card-image"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2 product-card-title">{item.name}</h5>
                    <br />
                    <p className="card-text mt-auto fw-bold product-card-price">
                        {item.price2 !== undefined && item.price2 !== null
                            ? item.price2.toLocaleString() + "원"
                            : "가격정보 없음"}
                    </p>
                </div>
            </div>
        </Link>
    );
}

