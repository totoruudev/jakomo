package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cate;

    @Column(nullable = false)
    private String gname;

    private int price1;  // 원가
    private int price2;  // 할인가
    private int amount;  // 재고 수량

    private String img1;
    private String img2;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    private LocalDateTime resdate = LocalDateTime.now();

    // 연관관계 (다대다 매핑 - 연결 엔티티 사용)
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductSubCategory> subCategories = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProductOptionGroup> optionGroups = new ArrayList<>();
}
