package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_sub_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;
}
