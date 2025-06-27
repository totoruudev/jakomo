package com.jakomo.app.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProductDetailDTO {
    private Long id;
    private String cate;
    private String gname;
    private int price1;
    private int price2;
    private int amount;
    private String img1;
    private String img2;
    private String description;
    private LocalDateTime resdate;
    private List<OptionGroupDTO> optionGroups;

    @Data
    public static class OptionGroupDTO {
        private Long id;
        private String groupName;
        private int displayOrder;
        private List<OptionDTO> options;

        @Data
        public static class OptionDTO {
            private Long id;
            private String name;
            private int price;
            private int displayOrder;
            private boolean isDisabled;
        }
    }
}
