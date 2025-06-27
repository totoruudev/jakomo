package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user; // 로그인 사용자

    @ManyToOne
    private Product product;

    private int quantity;

    private String selectedOptions; // 예: "색상: 네이비 / 스툴: 추가"
}
