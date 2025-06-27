package com.jakomo.app.service;

import com.jakomo.app.entity.Delivery;
import com.jakomo.app.entity.Orders;
import com.jakomo.app.entity.enums.DeliveryStatus;
import com.jakomo.app.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    // 결제 완료 후 배송 정보 생성
    public Delivery createDelivery(Orders order) {
        Delivery delivery = Delivery.builder()
                .order(order)
                .receiverName("기본수령인")
                .receiverPhone("010-0000-0000")
                .address("기본 주소")       
                .status(DeliveryStatus.READY)
                .build();

        return deliveryRepository.save(delivery);
    }

    // 사용자 배송 목록 조회
    public List<Delivery> getMyDeliveries(String username) {
        return deliveryRepository.findByOrder_Username(username);
    }

    // 배송 상태 변경 (관리자 기능)
    public void updateDeliveryStatus(Long deliveryId, DeliveryStatus status) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("배송 정보를 찾을 수 없습니다."));

        delivery.setStatus(status);

        if (status == DeliveryStatus.SHIPPED) {
            delivery.setShippedAt(LocalDateTime.now());
        } else if (status == DeliveryStatus.DELIVERED) {
            delivery.setDeliveredAt(LocalDateTime.now());
        }

        deliveryRepository.save(delivery);
    }

    // 배송 상세 조회
    public Delivery getDelivery(Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("배송 정보를 찾을 수 없습니다."));
    }
}
