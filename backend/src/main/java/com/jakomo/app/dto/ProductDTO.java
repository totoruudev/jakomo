package com.jakomo.app.dto;

import com.jakomo.app.entity.Product;
import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String cate;
    private String name;      // 상품명 (gname에서 변환)
    private int price1;       // 정가
    private int price2;       // 판매가
    private int amount;
    private String image;     // 메인 이미지 (img1에서 변환)
    private String img2;
    private String description;

    // 정적 메서드: 엔티티 → DTO 변환
    public static ProductDTO from(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setCate(p.getCate());
        dto.setName(p.getGname());
        dto.setPrice1(p.getPrice1());   // 정가
        dto.setPrice2(p.getPrice2());   // 판매가
        dto.setAmount(p.getAmount());
        dto.setImage(p.getImg1());
        dto.setImg2(p.getImg2());
        dto.setDescription(p.getDescription());
        return dto;
    }

}
