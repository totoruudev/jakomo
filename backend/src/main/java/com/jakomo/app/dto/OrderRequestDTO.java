package com.jakomo.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private Long productId;
        private int quantity;
        private String selectedOptions;
        private boolean leather;
        private boolean stool;
    }
}