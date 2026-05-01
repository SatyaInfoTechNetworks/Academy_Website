package com.satyainfotech.academy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@Table(name = "packages")
public class AcademyPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 1000)
    private String description;
    private Double price;
    private Double originalPrice;
    private String duration;
    private String level;
    private Boolean isHighlighted;
    private String badge;
    private String imageUrl;
    private Integer studentCount;
    private Double rating;

    private Integer slotLimit = 50;
    private Integer enrolledCount = 0;
    private Boolean hasCertificate = true;
    private String certificateType = "Verified Included";
    private String offerText; // e.g., "Limited Time Offer: Only 7 seats left"

    @Convert(converter = com.satyainfotech.academy.converter.StringListConverter.class)
    @Column(columnDefinition = "TEXT", length = 5000)
    private java.util.List<String> learningOutcomes;

    @Convert(converter = com.satyainfotech.academy.converter.PackageFaqListConverter.class)
    @Column(columnDefinition = "TEXT", length = 5000)
    private java.util.List<PackageFaq> faqs;

    @Convert(converter = com.satyainfotech.academy.converter.PackageTestimonialListConverter.class)
    @Column(columnDefinition = "TEXT", length = 5000)
    private java.util.List<Testimonial> testimonials;

    @Convert(converter = com.satyainfotech.academy.converter.PackageModuleListConverter.class)
    @Column(columnDefinition = "TEXT", length = 5000)
    private java.util.List<Module> modules;

    @Convert(converter = com.satyainfotech.academy.converter.PackagePromoCodeListConverter.class)
    @Column(columnDefinition = "TEXT", length = 2000)
    private java.util.List<PromoCode> promoCodes;

    @Data
    public static class PackageFaq {
        private String question;
        private String answer;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Module {
        private String title;
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Testimonial {
        private Long id;
        private String studentName; // Hidden in UI but kept in DB
        private String role; // Hidden in UI but kept in DB
        private String content; // Text review or caption
        private String imageUrl; // Screenshot or profile photo
        private String type = "text"; // "text", "image", "video"
        private String videoUrl;
        private String aspectRatio = "16:9"; // "16:9", "9:16", "1:1"
        private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

        public Testimonial(Long id, String studentName, String role, String content, String imageUrl) {
            this.id = id;
            this.studentName = studentName;
            this.role = role;
            this.content = content;
            this.imageUrl = imageUrl;
            this.createdAt = java.time.LocalDateTime.now();
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PromoCode {
        private String code;
        private Double discountAmount;
        private Integer useLimit;
        private Integer usedCount = 0;
    }
}
