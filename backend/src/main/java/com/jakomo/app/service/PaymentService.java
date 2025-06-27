package com.jakomo.app.service;

import com.jakomo.app.entity.OrderItem;
import com.jakomo.app.entity.Orders;
import com.jakomo.app.entity.Payment;
import com.jakomo.app.entity.Product;
import com.jakomo.app.entity.enums.OrderStatus;
import com.jakomo.app.entity.enums.PaymentStatus;
import com.jakomo.app.repository.OrderRepository;
import com.jakomo.app.repository.PaymentRepository;
import com.jakomo.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final DeliveryService deliveryService;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${kakaopay.admin-key}")
    private String adminKey;
    @Value("${kakaopay.cid}")
    private String cid;
    @Value("${kakaopay.approval-url}")
    private String approvalUrl;
    @Value("${kakaopay.cancel-url}")
    private String cancelUrl;
    @Value("${kakaopay.fail-url}")
    private String failUrl;


    /**
     * 카카오페이 결제 준비 (결제 창 URL 반환)
     */
    public String kakaoPayReady(Long orderId, String userId, String itemName, int amount) {

        log.info("======== [KAKAOPAY KEY TEST] =========");
        log.info("adminKey: {}", adminKey);
        log.info("cid: {}", cid);
        log.info("approvalUrl: {}", approvalUrl);
        log.info("cancelUrl: {}", cancelUrl);
        log.info("failUrl: {}", failUrl);
        log.info("=======================================");


        String readyUrl = "https://kapi.kakao.com/v1/payment/ready";
        log.info("=== [카카오페이 결제 준비 호출] ===");
        log.info("orderId: {}, userId: {}, itemName: {}, amount: {}", orderId, userId, itemName, amount);

        // 필수값 체크
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("userId(이메일 또는 유저아이디)가 null입니다. 카카오페이 partner_user_id에 필수로 들어가야 합니다.");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + adminKey);
        System.out.println("Authorization 헤더: KakaoAK " + adminKey);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", cid);
        params.add("partner_order_id", String.valueOf(orderId));
        params.add("partner_user_id", userId);
        params.add("item_name", itemName);
        params.add("quantity", "1");
        params.add("total_amount", String.valueOf(amount));
        params.add("tax_free_amount", "0");
        params.add("approval_url", approvalUrl + "?orderId=" + orderId + "&userId=" + userId);
        params.add("cancel_url", cancelUrl + "?orderId=" + orderId);
        params.add("fail_url", failUrl + "?orderId=" + orderId);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(readyUrl, request, Map.class);

            Map<String, Object> body = response.getBody();
            String tid = (String) body.get("tid");
            String redirectUrl = (String) body.get("next_redirect_pc_url");

            // 결제 정보 저장
            requestPayment(orderId, tid, "KAKAOPAY");
            log.info("[카카오페이 ready 완료] tid={}, redirectUrl={}", tid, redirectUrl);

            return redirectUrl;
        } catch (HttpClientErrorException e) {
            log.error("[카카오페이 ready 실패] {}", e.getResponseBodyAsString());
            throw new RuntimeException("카카오페이 결제 준비 실패: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            log.error("[카카오페이 ready 처리 중 예외]", e);
            throw new RuntimeException("카카오페이 결제 준비 중 예외 발생", e);
        }
    }

    /**
     * 결제 정보(tid) 저장
     */
    @Transactional
    public Payment requestPayment(Long orderId, String tid, String method) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문이 존재하지 않습니다."));

        Payment payment = Payment.builder()
                .order(order)
                .transactionId(tid)
                .method(method)
                .status(PaymentStatus.READY)
                .build();

        return paymentRepository.save(payment);
    }

    /**
     * 결제 승인 (카카오페이 API)
     */
    @Transactional
    public void kakaoPayApprove(String tid, String pgToken, Long orderId, String userId) {
        String approveUrl = "https://kapi.kakao.com/v1/payment/approve";
        log.info("=== [카카오페이 결제 승인 호출] ===");
        log.info("tid: {}, pgToken: {}, orderId: {}, userId: {}", tid, pgToken, orderId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + adminKey);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", cid);
        params.add("tid", tid);
        params.add("partner_order_id", String.valueOf(orderId));
        params.add("partner_user_id", userId);
        params.add("pg_token", pgToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            restTemplate.postForEntity(approveUrl, request, Map.class);
            completePayment(orderId);
            log.info("[카카오페이 결제 승인 성공] orderId={}", orderId);
        } catch (HttpClientErrorException e) {
            log.error("[카카오페이 승인 실패] {}", e.getResponseBodyAsString());
            throw new RuntimeException("카카오페이 결제 승인 실패: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            log.error("[카카오페이 승인 처리 중 예외]", e);
            throw new RuntimeException("카카오페이 결제 승인 중 예외 발생", e);
        }
    }

    /**
     * 결제 확정/재고 차감/배송생성
     */
    @Transactional
    public void completePayment(Long orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문이 존재하지 않습니다."));

        // 재고 차감
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            int currentStock = product.getAmount();
            int orderedQty = item.getQuantity();

            if (currentStock < orderedQty) {
                throw new RuntimeException("재고 부족: " + product.getGname());
            }

            product.setAmount(currentStock - orderedQty);
            productRepository.save(product);
        }

        // 결제/주문 상태 업데이트
        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() -> new RuntimeException("결제 정보를 찾을 수 없습니다."));
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(LocalDateTime.now());
        paymentRepository.save(payment);

        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        // 배송정보 생성
        deliveryService.createDelivery(order);

        log.info("[결제완료/배송생성] orderId={}", orderId);
    }

    /**
     * 결제 실패/취소 처리
     */
    @Transactional
    public void failPayment(Long orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문이 존재하지 않습니다."));

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        paymentRepository.findByOrder(order).ifPresent(payment -> {
            payment.setStatus(PaymentStatus.FAIL);
            paymentRepository.save(payment);
        });
        log.info("[결제취소/실패 처리] orderId={}", orderId);
    }

    // ==================== 통계/조회용 =======================

    /**
     * 결제 총 건수
     */
    public long getTotalPaymentCount() {
        return paymentRepository.count();
    }

    /**
     * 결제 완료 금액 합계
     */
    public int getTotalPaidAmount() {
        return paymentRepository.findAllByStatus(PaymentStatus.SUCCESS).stream()
                .mapToInt(p -> p.getOrder().getTotalPrice())
                .sum();
    }

    /**
     * 마지막 결제 성공 주문 id
     */
    public Long getLatestPaidOrderId() {
        return paymentRepository.findTopByStatusOrderByPaidAtDesc(PaymentStatus.SUCCESS)
                .map(p -> p.getOrder().getId())
                .orElse(null);
    }
}
