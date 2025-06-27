package com.jakomo.app.service;

import com.jakomo.app.dto.ProductDTO;
import com.jakomo.app.dto.ProductDetailDTO;
import com.jakomo.app.entity.Product;
import com.jakomo.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // 엔티티 → DTO 변환
    private ProductDTO toDTO(Product p) {
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

    // 전체 상품 조회 (DTO 반환)
    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    // 단일 상품 상세 (DTO 반환)
    @Transactional(readOnly = true)
    public ProductDetailDTO getProductDetail(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다. ID: " + id));

        ProductDetailDTO dto = new ProductDetailDTO();
        dto.setId(product.getId());
        dto.setCate(product.getCate());
        dto.setGname(product.getGname());
        dto.setPrice1(product.getPrice1());
        dto.setPrice2(product.getPrice2());
        dto.setAmount(product.getAmount());
        dto.setImg1(product.getImg1());
        dto.setImg2(product.getImg2());
        dto.setDescription(product.getDescription());
        dto.setResdate(product.getResdate());

        // optionGroups 매핑 (엔티티 → DTO)
        List<ProductDetailDTO.OptionGroupDTO> groupDTOs = product.getOptionGroups().stream()
                .sorted(Comparator.comparingInt(g -> g.getDisplayOrder()))
                .map(group -> {
                    ProductDetailDTO.OptionGroupDTO groupDTO = new ProductDetailDTO.OptionGroupDTO();
                    groupDTO.setId(group.getId());
                    groupDTO.setGroupName(group.getGroupName());
                    groupDTO.setDisplayOrder(group.getDisplayOrder());

                    // options 매핑
                    List<ProductDetailDTO.OptionGroupDTO.OptionDTO> optionDTOs = group.getOptions().stream()
                            .sorted(Comparator.comparingInt(o -> o.getDisplayOrder()))
                            .map(opt -> {
                                ProductDetailDTO.OptionGroupDTO.OptionDTO optDTO = new ProductDetailDTO.OptionGroupDTO.OptionDTO();
                                optDTO.setId(opt.getId());
                                optDTO.setName(opt.getName());
                                optDTO.setPrice(opt.getPrice());
                                optDTO.setDisplayOrder(opt.getDisplayOrder());
                                optDTO.setDisabled(opt.isDisabled());
                                return optDTO;
                            }).toList();

                    groupDTO.setOptions(optionDTOs);
                    return groupDTO;
                }).toList();

        dto.setOptionGroups(groupDTOs);

        return dto;
    }

    // 상품 등록 (Product entity 반환 - 내부용)
    public Product save(Product product) {
        return productRepository.save(product);
    }

    // 상품 삭제
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    // 상품 수정
    public Product update(Long id, Product newProduct) {
        return productRepository.findById(id).map(product -> {
            product.setCate(newProduct.getCate());
            product.setGname(newProduct.getGname());
            product.setPrice1(newProduct.getPrice1());
            product.setPrice2(newProduct.getPrice2());
            product.setAmount(newProduct.getAmount());
            product.setImg1(newProduct.getImg1());
            product.setImg2(newProduct.getImg2());
            product.setDescription(newProduct.getDescription());
            return productRepository.save(product);
        }).orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다. ID: " + id));
    }

    public List<ProductDTO> findByCategoryAndKeyword(String category, String keyword, Integer limit) {
        List<Product> products = productRepository.findAll(); // 일단 전체 조회 후...
        Stream<Product> stream = products.stream();
        if (category != null && !category.equals("all")) {
            stream = stream.filter(p -> p.getCate().equalsIgnoreCase(category));
        }
        if (keyword != null && !keyword.equals("ALL")) {
            stream = stream.filter(p -> p.getGname().contains(keyword));
        }
        if (limit != null) {
            stream = stream.limit(limit);
        }
        // DTO 변환 등등
        return stream.map(ProductDTO::from).collect(Collectors.toList());
    }


}
