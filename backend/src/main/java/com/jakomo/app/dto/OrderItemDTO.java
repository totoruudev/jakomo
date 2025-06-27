package com.jakomo.app.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private int quantity;
    private int price;
    private String selectedOptions;

    private ProductSimpleDTO product;
}
