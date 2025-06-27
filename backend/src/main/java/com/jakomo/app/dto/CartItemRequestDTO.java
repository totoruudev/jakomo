package com.jakomo.app.dto;

import lombok.Data;

@Data
public class CartItemRequestDTO {
    private Long productId;
    private int quantity;
    private String selectedOptions;
}
