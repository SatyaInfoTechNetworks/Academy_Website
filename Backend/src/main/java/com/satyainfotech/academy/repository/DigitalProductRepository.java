package com.satyainfotech.academy.repository;

import com.satyainfotech.academy.model.DigitalProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DigitalProductRepository extends JpaRepository<DigitalProduct, Long> {
    List<DigitalProduct> findAllByOrderByIdDesc();
}
