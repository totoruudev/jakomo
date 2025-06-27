package com.jakomo.app.service;

import com.jakomo.app.dto.OrderDetailDTO;
import com.jakomo.app.dto.OrderItemDTO;
import com.jakomo.app.dto.OrderRequestDTO;
import com.jakomo.app.dto.ProductSimpleDTO;
import com.jakomo.app.entity.Cart;
import com.jakomo.app.entity.OrderItem;
import com.jakomo.app.entity.Orders;
import com.jakomo.app.entity.Product;
import com.jakomo.app.entity.enums.OrderStatus;
import com.jakomo.app.repository.CartRepository;
import com.jakomo.app.repository.OrderItemRepository;
import com.jakomo.app.repository.OrderRepository;
import com.jakomo.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    // 장바구니 기반 주문
    public Orders createOrderFromCart(String username) {
        List<Cart> cartItems = cartRepository.findByUsername(username);
        if (cartItems.isEmpty()) throw new RuntimeException("장바구니가 비어있습니다.");

        List<OrderItem> orderItems = new ArrayList<>();
        int totalPrice = 0;

        for (Cart cart : cartItems) {
            Product product = cart.getProduct();
            if (product.getAmount() < cart.getQuantity()) {
                throw new RuntimeException("재고 부족: " + product.getGname());
            }
            product.setAmount(product.getAmount() - cart.getQuantity());
            productRepository.save(product);

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(cart.getQuantity())
                    .price(product.getPrice2())
                    .selectedOptions(cart.getSelectedOptions())
                    .build();

            orderItems.add(item);
            totalPrice += item.getPrice() * item.getQuantity();
        }

        Orders order = Orders.builder()
                .username(username)
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .totalPrice(totalPrice)
                .items(orderItems)
                .build();

        orderItems.forEach(item -> item.setOrder(order));
        Orders savedOrder = orderRepository.save(order);
        cartRepository.deleteByUsername(username);
        return savedOrder;
    }

    // 단일상품 바로구매
    public Orders createSingleOrder(OrderRequestDTO.OrderItemDTO dto, String username) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("상품 없음"));

        if (product.getAmount() < dto.getQuantity()) {
            throw new RuntimeException("재고 부족");
        }
        product.setAmount(product.getAmount() - dto.getQuantity());
        productRepository.save(product);

        OrderItem item = OrderItem.builder()
                .product(product)
                .quantity(dto.getQuantity())
                .price(product.getPrice2())
                .selectedOptions(dto.getSelectedOptions())
                .build();

        Orders order = Orders.builder()
                .username(username)
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .totalPrice(item.getPrice() * item.getQuantity())
                .items(List.of(item))
                .build();

        item.setOrder(order);
        return orderRepository.save(order);
    }

    public List<Orders> getMyOrders(String username) {
        return orderRepository.findByUsername(username);
    }

    public Orders getOrder(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("주문 없음"));
    }

    public void updateOrderStatus(Long id, OrderStatus status) {
        Orders order = getOrder(id);
        order.setStatus(status);
        orderRepository.save(order);
    }

    // 주문 목록 DTO로 반환
    public List<OrderDetailDTO> getMyOrdersDTO(String username) {
        return orderRepository.findByUsername(username).stream()
                .map(this::toOrderDetailDTO)
                .toList();
    }

    // 주문 상세 DTO 반환
    public OrderDetailDTO getOrderDTO(Long id, String username) {
        Orders order = getOrder(id);
        if (!order.getUsername().equals(username)) throw new RuntimeException("권한 없음");
        return toOrderDetailDTO(order);
    }

    private OrderDetailDTO toOrderDetailDTO(Orders order) {
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(order.getId());
        dto.setStatus(order.getStatus().name());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setItems(
                order.getItems().stream()
                        .map(this::toOrderItemDTO)
                        .toList()
        );
        dto.setUsername(order.getUsername());
        return dto;
    }

    private OrderItemDTO toOrderItemDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setSelectedOptions(item.getSelectedOptions());

        Product product = item.getProduct();
        ProductSimpleDTO pdto = new ProductSimpleDTO();
        pdto.setId(product.getId());
        pdto.setGname(product.getGname());
        pdto.setImg1(product.getImg1());
        dto.setProduct(pdto);

        return dto;
    }
}
