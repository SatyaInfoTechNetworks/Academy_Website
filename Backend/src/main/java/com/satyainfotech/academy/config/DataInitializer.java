package com.satyainfotech.academy.config;

import com.satyainfotech.academy.model.AcademyPackage;
import com.satyainfotech.academy.model.DigitalProduct;
import com.satyainfotech.academy.repository.DigitalProductRepository;
import com.satyainfotech.academy.repository.PackageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {

        @org.springframework.beans.factory.annotation.Autowired
        private org.springframework.context.ApplicationContext context;

        @Bean
        public CommandLineRunner initData(PackageRepository packageRepository,
                        DigitalProductRepository digitalProductRepository) {
                return args -> {
                        // Digital Products Seed
                        if (digitalProductRepository.count() == 0) {
                                DigitalProduct p1 = new DigitalProduct();
                                p1.setTitle("3000+ Premium Reels Bundle");
                                p1.setDescription(
                                                "Get access to 3000+ Ready-to-use Reels with No Copyright. Grow your social media faster than ever with high-quality viral content.");
                                p1.setPrice(499.0);
                                p1.setOriginalPrice(2999.0);
                                p1.setImageUrl("https://i.ibb.co/d0g5NDJ9/reel.png");
                                p1.setCategory("Bundle");
                                p1.setRating(5.0);
                                p1.setReviewCount(450);
                                p1.setFileType("ZIP/Cloud");
                                p1.setFileSize("8GB");
                                p1.setFeatures(Arrays.asList("3000+ Viral Clips", "No Copyright Required",
                                                "High Definition (HD)", "Instant Download Access"));
                                p1.setPromoCodes(Arrays.asList(new DigitalProduct.PromoCode("REEL50", 50.0, 10, 0)));
                                p1.setBuyUrl("/payment/dp-1");

                                DigitalProduct p2 = new DigitalProduct();
                                p2.setTitle("Social Media Marketing Toolkit");
                                p2.setDescription(
                                                "Everything you need to scale your social media presence. Includes 100+ templates and strategy docs.");
                                p2.setPrice(299.0);
                                p2.setOriginalPrice(999.0);
                                p2.setImageUrl("https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800");
                                p2.setCategory("Toolkit");
                                p2.setRating(4.9);
                                p2.setReviewCount(89);
                                p2.setFileType("ZIP");
                                p2.setFileSize("45MB");
                                p2.setFeatures(Arrays.asList("Canva Templates", "Engagement Scripts",
                                                "Content Calendar", "Hashtag Strategy Guide"));
                                p2.setPromoCodes(Arrays.asList(new DigitalProduct.PromoCode("SOCIAL20", 20.0, 5, 0)));
                                p2.setBuyUrl("/payment/dp-2");

                                DigitalProduct p3 = new DigitalProduct();
                                p3.setTitle("Freelancing Mastery Blueprint");
                                p3.setDescription(
                                                "The step-by-step roadmap to making your first $1000 as a freelancer. No fluff, just results.");
                                p3.setPrice(199.0);
                                p3.setOriginalPrice(799.0);
                                p3.setImageUrl("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800");
                                p3.setCategory("Video Course");
                                p3.setRating(4.7);
                                p3.setReviewCount(215);
                                p3.setFileType("MP4/Link");
                                p3.setFileSize("1.2GB");
                                p3.setFeatures(Arrays.asList("Client Acquisition Secrets", "Pricing Strategies",
                                                "Portfolio Building", "Contract Templates"));
                                p3.setPromoCodes(Arrays.asList(new DigitalProduct.PromoCode("FREE10", 10.0, 100, 0)));
                                p3.setBuyUrl("/payment/dp-3");

                                digitalProductRepository.saveAll(Arrays.asList(p1, p2, p3));
                        }

                        if (packageRepository.count() == 0) {
                                AcademyPackage platinum = new AcademyPackage();
                                platinum.setTitle("Platinum Package");
                                platinum.setDescription(
                                                "Master 50+ Earning Apps and 30+ Training Videos. Learn how to earn 10K per month with our proven system. 100% Money Back Guarantee.");
                                platinum.setPrice(1999.0);
                                platinum.setOriginalPrice(9999.0);
                                platinum.setDuration("5 Days Training");
                                platinum.setLevel("Platinum");
                                platinum.setBadge("Elite");
                                platinum.setIsHighlighted(true);
                                platinum.setStudentCount(5000);
                                platinum.setRating(4.9);
                                platinum.setImageUrl(
                                                "https://i.ibb.co/602QRFFq/Gemini-Generated-Image-hq0ogdhq0ogdhq0o.png");
                                platinum.setLearningOutcomes(Arrays.asList(
                                                "50+ Verified Earning Apps",
                                                "30+ Professional Training Videos",
                                                "10K Monthly Income Roadmap",
                                                "100% Money Back Guarantee"));
                                platinum.setFaqs(Arrays.asList(
                                                createFaq("What is the Platinum Package?",
                                                                "A complete training on high-paying apps and websites."),
                                                createFaq("Is the income guaranteed?",
                                                                "Yes, if you follow the steps correctly, you can reach 10K/month.")));

                                java.util.ArrayList<AcademyPackage.Testimonial> platinumTestimonials = new java.util.ArrayList<>();
                                AcademyPackage.Testimonial t1 = new AcademyPackage.Testimonial(1L, "Success Client",
                                                "Freelancer",
                                                "I am now earning 12k monthly using the apps from this package!",
                                                "https://i.pravatar.cc/150?u=1");
                                t1.setType("image");
                                t1.setAspectRatio("9:16");
                                t1.setImageUrl("https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"); // Placeholder
                                                                                                                      // screenshot
                                platinumTestimonials.add(t1);
                                platinum.setTestimonials(platinumTestimonials);

                                platinum.setModules(Arrays.asList(
                                                new AcademyPackage.Module("Day 1: Question & Answer Tasks",
                                                                "Learn how to answer simple questions and earn 3600₹."),
                                                new AcademyPackage.Module("Day 2: Email Reading Profits",
                                                                "Master the art of reading mails to earn 1000₹/month."),
                                                new AcademyPackage.Module("Day 3: Professional App Reviews",
                                                                "Write one review and get 1000₹ per app review."),
                                                new AcademyPackage.Module("Day 4: Passive App Income",
                                                                "Just open the app and keep it running for 2000₹/month."),
                                                new AcademyPackage.Module("Day 5: Opinion Sharing",
                                                                "Share your honest opinion and earn 5000₹/month. ")));

                                platinum.setHasCertificate(true);
                                platinum.setCertificateType("Platinum Certified");

                                AcademyPackage gold = new AcademyPackage();
                                gold.setTitle("Gold Package");
                                gold.setDescription(
                                                "Get access to 50+ Earning App Links and a Special Group. Perfect for those who want to earn on their own without training videos.");
                                gold.setPrice(999.0);
                                gold.setOriginalPrice(4999.0);
                                gold.setDuration("Lifetime Access");
                                gold.setLevel("Gold");
                                gold.setBadge("Value");
                                gold.setIsHighlighted(false);
                                gold.setStudentCount(3000);
                                gold.setRating(4.7);
                                gold.setImageUrl("https://i.ibb.co/V0HQhbvK/earninggold.png");
                                gold.setLearningOutcomes(Arrays.asList(
                                                "50+ Earning App Links",
                                                "Access to Private Special Group",
                                                "Earn On Your Own Roadmap",
                                                "Lifetime Updates"));
                                gold.setFaqs(Arrays.asList(
                                                createFaq("What is the Gold Package?",
                                                                "It provides direct links to high-paying apps without video tutorials."),
                                                createFaq("Will I get help?",
                                                                "Yes, you get access to our special support group.")));

                                gold.setModules(Arrays.asList(
                                                new AcademyPackage.Module("Access App Links",
                                                                "Instantly get the list of 50+ verified earning apps."),
                                                new AcademyPackage.Module("Join Special Group",
                                                                "Get added to our private community for daily updates.")));

                                gold.setHasCertificate(false);

                                packageRepository.saveAll(Arrays.asList(platinum, gold));
                        }

                        // Initialize Site Config
                        com.satyainfotech.academy.repository.SiteConfigRepository configRepo = context.getBean(
                                        com.satyainfotech.academy.repository.SiteConfigRepository.class);
                        if (configRepo.count() == 0) {
                                configRepo.saveAll(Arrays.asList(
                                                new com.satyainfotech.academy.model.SiteConfig("heroTitle",
                                                                "Start Your Dream Career in Tech & Marketing"),
                                                new com.satyainfotech.academy.model.SiteConfig("heroSubtitle",
                                                                "Join 10,000+ students mastering high-income skills."),
                                                new com.satyainfotech.academy.model.SiteConfig("contactEmail",
                                                                "support@satyainfotech.com"),
                                                new com.satyainfotech.academy.model.SiteConfig("contactPhone",
                                                                "+91 90140 91291"),
                                                new com.satyainfotech.academy.model.SiteConfig(
                                                                "paymentQRCodeUrl",
                                                                "https://i.ibb.co/PZBFV92P/payment.jpg"),
                                                new com.satyainfotech.academy.model.SiteConfig("footerText",
                                                                "© 2026 SatyaInfotech Academy. All rights reserved."),

                                                // Stats
                                                new com.satyainfotech.academy.model.SiteConfig("statStudents",
                                                                "12,000+"),
                                                new com.satyainfotech.academy.model.SiteConfig("statEarnings",
                                                                "₹3.5Cr+"),
                                                new com.satyainfotech.academy.model.SiteConfig("statRating",
                                                                "4.9/5"),

                                                // Mission
                                                new com.satyainfotech.academy.model.SiteConfig("missionTitle",
                                                                "Our Mission: Your Financial Freedom"),
                                                new com.satyainfotech.academy.model.SiteConfig("missionText",
                                                                "SatyaInfotech Academy was founded with one goal: to bridge the gap between academic theory and real-world wealth creation. We don't just teach jobs; we teach high-income mastery."),

                                                // About Us Page
                                                new com.satyainfotech.academy.model.SiteConfig("aboutHeroTitle",
                                                                "Empowering the Next Generation"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutHeroDesc",
                                                                "SatyaInfotech Academy was built with a simple mission: To turn everyday students into high-earning digital professionals. We believe that traditional education is too slow for the modern digital economy."),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStoryTitle",
                                                                "Our Story"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStoryDesc",
                                                                "Started as a small YouTube community, SatyaInfotech Academy has grown into a leading digital skills hub. We noticed that thousands of people wanted to earn online but didn't know where to start. We created these step-by-step blueprints to solve exactly that."),

                                                // Team / Founders
                                                new com.satyainfotech.academy.model.SiteConfig("founderName",
                                                                "Satya Dev"),
                                                new com.satyainfotech.academy.model.SiteConfig("founderRole",
                                                                "Mentor & YouTuber"),
                                                new com.satyainfotech.academy.model.SiteConfig("founderDesc",
                                                                "A passionate educator and YouTube creator with over 5 years of experience in helping people master digital skills. Satya has mentored 10,000+ students on their journey to financial independence."),
                                                new com.satyainfotech.academy.model.SiteConfig("founderImage",
                                                                "https://i.pravatar.cc/300?u=satya"),
                                                new com.satyainfotech.academy.model.SiteConfig("founderSocial1Icon",
                                                                "fab fa-youtube"),
                                                new com.satyainfotech.academy.model.SiteConfig("founderSocial1Url",
                                                                "#"),
                                                new com.satyainfotech.academy.model.SiteConfig("founderSocial2Icon",
                                                                "fab fa-instagram"),
                                                new com.satyainfotech.academy.model.SiteConfig("founderSocial2Url",
                                                                "#"),

                                                new com.satyainfotech.academy.model.SiteConfig("coFounderName",
                                                                "Alex Rivera"),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderRole",
                                                                "Software Developer & Affiliate Marketer"),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderDesc",
                                                                "A full-stack engineer and affiliate marketing expert who brings the technical edge to the academy. Alex ensures that all our packages are backed by the latest industry standards and high-conversion strategies."),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderImage",
                                                                "https://i.pravatar.cc/300?u=dev"),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderSocial1Icon",
                                                                "fab fa-linkedin"),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderSocial1Url",
                                                                "#"),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderSocial2Icon",
                                                                "fab fa-github"),
                                                new com.satyainfotech.academy.model.SiteConfig("coFounderSocial2Url",
                                                                "#"),

                                                // About Page Stats
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStat1Number",
                                                                "5+"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStat1Label",
                                                                "Years of Experience"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStat2Number",
                                                                "50k+"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStat2Label",
                                                                "Community Members"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStat3Number",
                                                                "100%"),
                                                new com.satyainfotech.academy.model.SiteConfig("aboutStat3Label",
                                                                "Commitment to Success"),

                                                // Features (JSON)
                                                new com.satyainfotech.academy.model.SiteConfig("homeFeatures",
                                                                "[{\"title\":\"Income Focused\",\"text\":\"Every module is designed to help you land your first client or high-paying job.\",\"icon\":\"💸\"},{\"title\":\"Live Support\",\"text\":\"Get stuck? Our mentors are available 24/7 on our private Discord community.\",\"icon\":\"📱\"},{\"title\":\"Lifetime Updates\",\"text\":\"Technology changes. Our packages update every month at no extra cost to you.\",\"icon\":\"🛡\"}]"),

                                                // Global FAQs (JSON)
                                                new com.satyainfotech.academy.model.SiteConfig("homeFaqs",
                                                                "[{\"question\":\"Do I need prior experience?\",\"answer\":\"No! All our tracks start from absolute basics and move to advanced strategies.\"},{\"question\":\"What if I don't see results?\",\"answer\":\"We offer a 7-day no-questions-asked refund policy. If you don't like it, you get your money back.\"},{\"question\":\"Will I get a certificate?\",\"answer\":\"Yes, you'll receive a verified certificate from SatyaInfotech Academy upon completion.\"},{\"question\":\"Is it accessible forever?\",\"answer\":\"Yes! One-time payment gets you lifetime access to the package and all future updates.\"}]")));
                        }
                };
        }

        private AcademyPackage.PackageFaq createFaq(String q, String a) {
                AcademyPackage.PackageFaq faq = new AcademyPackage.PackageFaq();
                faq.setQuestion(q);
                faq.setAnswer(a);
                return faq;
        }
}
