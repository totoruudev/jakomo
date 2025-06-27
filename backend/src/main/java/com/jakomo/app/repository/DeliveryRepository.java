package com.jakomo.app.repository;

import com.jakomo.app.entity.Delivery;
import com.jakomo.app.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByOrder(Orders order);
    List<Delivery> findByOrder_Username(String username); // 마이페이지: 내 배송 조회
}
