package com.jakomo.app.repository;

import com.jakomo.app.entity.Orders;
import com.jakomo.app.entity.Payment;
import com.jakomo.app.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    List<Payment> findAllByStatus(PaymentStatus status);

    Optional<Payment> findTopByStatusOrderByPaidAtDesc(PaymentStatus status);

    Optional<Payment> findByOrder(Orders order);
}
