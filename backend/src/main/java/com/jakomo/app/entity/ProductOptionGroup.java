package com.jakomo.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class ProductOptionGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String groupName;    // 예: "스툴 옵션"
    private int displayOrder;

    @OneToMany(mappedBy = "optionGroup", cascade = CascadeType.ALL)
    private List<ProductOption> options = new ArrayList<>();
}

