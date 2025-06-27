package com.jakomo.app.entity;

import com.jakomo.app.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 어떤 주문에 대한 결제인지 */
    @OneToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    /** PG사 트랜잭션 ID (예: KakaoPay tid) */
    private String transactionId;

    /** 결제 수단·카드사 등 */
    private String method;

    /** 결제 상태 */
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;   // READY, SUCCESS, FAIL, CANCEL

    private LocalDateTime paidAt;   // 실제 결제 시각

    private String extra;           // PG 응답 JSON 일부 저장해두고 싶을 때
}
