package com.satyainfotech.academy.controller;

import com.satyainfotech.academy.model.DigitalProduct;
import com.satyainfotech.academy.repository.DigitalProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/digital-products")
public class DigitalProductController {

    @Autowired
    private DigitalProductRepository digitalProductRepository;

    @GetMapping
    public List<DigitalProduct> getAllProducts() {
        return digitalProductRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/{id}")
    public DigitalProduct getProductById(@PathVariable Long id) {
        return digitalProductRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @PostMapping
    public DigitalProduct createProduct(@RequestBody DigitalProduct digitalProduct) {
        return digitalProductRepository.save(digitalProduct);
    }

    @PutMapping("/{id}")
    public DigitalProduct updateProduct(@PathVariable Long id, @RequestBody DigitalProduct productDetails) {
        DigitalProduct digitalProduct = digitalProductRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        digitalProduct.setTitle(productDetails.getTitle());
        digitalProduct.setDescription(productDetails.getDescription());
        digitalProduct.setPrice(productDetails.getPrice());
        digitalProduct.setOriginalPrice(productDetails.getOriginalPrice());
        digitalProduct.setImageUrl(productDetails.getImageUrl());
        digitalProduct.setCategory(productDetails.getCategory());
        digitalProduct.setRating(productDetails.getRating());
        digitalProduct.setReviewCount(productDetails.getReviewCount());
        digitalProduct.setFileType(productDetails.getFileType());
        digitalProduct.setFileSize(productDetails.getFileSize());
        digitalProduct.setFeatures(productDetails.getFeatures());
        digitalProduct.setBuyUrl(productDetails.getBuyUrl());
        digitalProduct.setHasCertificate(productDetails.getHasCertificate());
        digitalProduct.setCertificateType(productDetails.getCertificateType());
        digitalProduct.setPromoCodes(productDetails.getPromoCodes());

        return digitalProductRepository.save(digitalProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        digitalProductRepository.deleteById(id);
    }
}
