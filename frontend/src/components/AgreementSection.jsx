// components/AgreementSection.jsx
import React from "react";

export default function AgreementSection({ id, label, checked, onChange, content }) {
    return (
        <div className="form-check mt-4">
            <div
                className="required-box border p-3"
                style={{
                    height: "200px",
                    overflowY: "auto",
                    fontSize: "0.9rem",
                    whiteSpace: "pre-wrap",
                }}
            >
                {content}
            </div>
            <input
                type="checkbox"
                id={id}
                className="form-check-input mt-2"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className="form-check-label ms-2">
                {label}
            </label>
        </div>
    );
}
