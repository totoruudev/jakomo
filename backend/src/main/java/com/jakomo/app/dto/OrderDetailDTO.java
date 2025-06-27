package com.jakomo.app.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDetailDTO {
    private Long id;
    private String status;
    private LocalDateTime orderDate;
    private int totalPrice;
    private List<OrderItemDTO> items;
    private String username;
}
