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
public class ProductOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "option_group_id")
    private ProductOptionGroup optionGroup;

    private String name;         // 옵션명
    private int price;           // 추가금
    private int displayOrder;
    private boolean isDisabled;  // 안내문구 등 비선택 옵션
}
