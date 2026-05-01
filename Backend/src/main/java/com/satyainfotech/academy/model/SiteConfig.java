package com.satyainfotech.academy.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteConfig {
    @Id
    private String configKey;

    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String configValue;
}
