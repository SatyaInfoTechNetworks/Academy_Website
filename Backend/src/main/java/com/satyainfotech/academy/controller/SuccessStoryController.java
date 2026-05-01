package com.satyainfotech.academy.controller;

import com.satyainfotech.academy.model.AcademyPackage;
import com.satyainfotech.academy.repository.PackageRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/success-stories")
public class SuccessStoryController {

    private final PackageRepository packageRepository;

    public SuccessStoryController(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @GetMapping
    public List<AcademyPackage.Testimonial> getLatestStories() {
        return packageRepository.findAll().stream()
                .filter(academyPackage -> academyPackage.getTestimonials() != null)
                .flatMap(academyPackage -> academyPackage.getTestimonials().stream())
                .sorted((s1, s2) -> {
                    if (s2.getCreatedAt() == null || s1.getCreatedAt() == null)
                        return 0;
                    return s2.getCreatedAt().compareTo(s1.getCreatedAt());
                })
                .limit(10)
                .collect(Collectors.toList());
    }
}
