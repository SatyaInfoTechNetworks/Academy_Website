package com.satyainfotech.academy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@Entity
@Table(name = "digital_products")
@NoArgsConstructor
@AllArgsConstructor
public class DigitalProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private Double price;
    private Double originalPrice;
    private String imageUrl;
    private String category; // e.g., eBook, Template, Software
    private Double rating;
    private Integer reviewCount;
    private String fileType; // pdf, zip, etc.
    private String fileSize; // 5MB, etc.
    private Boolean hasCertificate = false;
    private String certificateType;

    @Convert(converter = com.satyainfotech.academy.converter.StringListConverter.class)
    @Column(columnDefinition = "TEXT", length = 5000)
    private List<String> features;

    @Convert(converter = com.satyainfotech.academy.converter.PackagePromoCodeListConverter.class)
    @Column(columnDefinition = "TEXT", length = 2000)
    private List<PromoCode> promoCodes;

    private String buyUrl;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PromoCode {
        private String code;
        private Double discountAmount;
        private Integer useLimit; // Maximum times this code can be used
        private Integer usedCount = 0; // Times this code has been used
    }
}
