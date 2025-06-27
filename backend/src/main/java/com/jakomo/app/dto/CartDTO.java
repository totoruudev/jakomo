package com.jakomo.app.dto;

import lombok.Data;

@Data
public class CartDTO {
    private Long productId;
    private int quantity;   
}
