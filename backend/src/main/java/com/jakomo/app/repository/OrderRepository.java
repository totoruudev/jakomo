package com.jakomo.app.repository;

import com.jakomo.app.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUsername(String username); // 내 주문 내역
}
