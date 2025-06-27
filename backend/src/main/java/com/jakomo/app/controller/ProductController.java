package com.jakomo.app.controller;

import com.jakomo.app.dto.ProductDTO;
import com.jakomo.app.dto.ProductDetailDTO;
import com.jakomo.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    // 전체 조회 (DTO로 반환)
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "limit", required = false) Integer limit
    ) {
        List<ProductDTO> products = productService.findByCategoryAndKeyword(category, keyword, limit);
        return ResponseEntity.ok(products);
    }

    // 단일 상세 (DetailDTO로 반환)
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductDetail(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductDetail(id));
    }
}
