package com.jakomo.app.entity;

import com.jakomo.app.entity.enums.DeliveryStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    private String receiverName;
    private String receiverPhone;
    private String address;           // 전체 주소(간단 버전)

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status;    // READY, SHIPPED, DELIVERED

    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}
