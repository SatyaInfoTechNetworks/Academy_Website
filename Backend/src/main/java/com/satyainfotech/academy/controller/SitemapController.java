package com.satyainfotech.academy.controller;

import com.satyainfotech.academy.model.AcademyPackage;
import com.satyainfotech.academy.model.DigitalProduct;
import com.satyainfotech.academy.repository.DigitalProductRepository;
import com.satyainfotech.academy.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SitemapController {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private DigitalProductRepository digitalProductRepository;

    @Value("${allowed.origins:https://satyainfotech.com}")
    private String frontendUrl;

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public String getSitemap() {
        // Strip trailing slash if any
        String baseUrl = frontendUrl;
        if (baseUrl.contains(",")) {
            baseUrl = baseUrl.split(",")[0]; // Take first origin
        }
        if (baseUrl.endsWith("/")) {
            baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
        }

        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

        // Static routes
        addUrl(xml, baseUrl + "/", "1.0", "daily");
        addUrl(xml, baseUrl + "/packages", "0.9", "daily");
        addUrl(xml, baseUrl + "/digital-products", "0.9", "daily");
        addUrl(xml, baseUrl + "/about-us", "0.8", "monthly");

        // Dynamic packages
        List<AcademyPackage> packages = packageRepository.findAll();
        for (AcademyPackage pkg : packages) {
            addUrl(xml, baseUrl + "/package/" + pkg.getId(), "0.8", "weekly");
        }

        xml.append("</urlset>");
        return xml.toString();
    }

    private void addUrl(StringBuilder xml, String url, String priority, String changefreq) {
        xml.append("  <url>\n");
        xml.append("    <loc>").append(url).append("</loc>\n");
        xml.append("    <changefreq>").append(changefreq).append("</changefreq>\n");
        xml.append("    <priority>").append(priority).append("</priority>\n");
        xml.append("  </url>\n");
    }
}
