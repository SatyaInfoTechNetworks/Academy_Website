package com.satyainfotech.academy.controller;

import com.satyainfotech.academy.model.AcademyPackage;
import com.satyainfotech.academy.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageRepository packageRepository;

    @GetMapping
    public List<AcademyPackage> getAllPackages() {
        return packageRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/{id}")
    public AcademyPackage getPackageById(@PathVariable Long id) {
        return packageRepository.findById(id).orElseThrow(() -> new RuntimeException("Package not found"));
    }

    @PostMapping
    public AcademyPackage createPackage(@RequestBody AcademyPackage academyPackage) {
        return packageRepository.save(academyPackage);
    }

    @PutMapping("/{id}")
    public AcademyPackage updatePackage(@PathVariable Long id, @RequestBody AcademyPackage packageDetails) {
        AcademyPackage academyPackage = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        academyPackage.setTitle(packageDetails.getTitle());
        academyPackage.setDescription(packageDetails.getDescription());
        academyPackage.setPrice(packageDetails.getPrice());
        academyPackage.setOriginalPrice(packageDetails.getOriginalPrice());
        academyPackage.setDuration(packageDetails.getDuration());
        academyPackage.setLevel(packageDetails.getLevel());
        academyPackage.setBadge(packageDetails.getBadge());
        academyPackage.setIsHighlighted(packageDetails.getIsHighlighted());
        academyPackage.setStudentCount(packageDetails.getStudentCount());
        academyPackage.setRating(packageDetails.getRating());
        academyPackage.setImageUrl(packageDetails.getImageUrl());
        academyPackage.setLearningOutcomes(packageDetails.getLearningOutcomes());
        academyPackage.setFaqs(packageDetails.getFaqs());
        academyPackage.setTestimonials(packageDetails.getTestimonials());
        academyPackage.setModules(packageDetails.getModules());
        academyPackage.setPromoCodes(packageDetails.getPromoCodes());
        academyPackage.setSlotLimit(packageDetails.getSlotLimit());
        academyPackage.setEnrolledCount(packageDetails.getEnrolledCount());
        academyPackage.setHasCertificate(packageDetails.getHasCertificate());
        academyPackage.setCertificateType(packageDetails.getCertificateType());
        academyPackage.setOfferText(packageDetails.getOfferText());

        return packageRepository.save(academyPackage);
    }

    @DeleteMapping("/{id}")
    public void deletePackage(@PathVariable Long id) {
        packageRepository.deleteById(id);
    }
}
