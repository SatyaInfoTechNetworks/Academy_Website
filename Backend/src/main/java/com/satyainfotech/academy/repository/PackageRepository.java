package com.satyainfotech.academy.repository;

import com.satyainfotech.academy.model.AcademyPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageRepository extends JpaRepository<AcademyPackage, Long> {
    java.util.List<AcademyPackage> findAllByOrderByIdDesc();
}
