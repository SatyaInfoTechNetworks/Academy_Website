package com.satyainfotech.academy.controller;

import com.satyainfotech.academy.model.SiteConfig;
import com.satyainfotech.academy.repository.SiteConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/config")
public class SiteConfigController {

    @Autowired
    private SiteConfigRepository repository;

    @GetMapping
    public Map<String, String> getConfig() {
        return repository.findAll().stream()
                .collect(Collectors.toMap(SiteConfig::getConfigKey, SiteConfig::getConfigValue));
    }

    @PostMapping
    public void updateConfig(@RequestBody Map<String, String> config) {
        List<SiteConfig> configs = config.entrySet().stream()
                .map(entry -> new SiteConfig(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
        repository.saveAll(configs);
    }
}
