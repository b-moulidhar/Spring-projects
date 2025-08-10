package com.sample.ecom_proj.repository;

import com.sample.ecom_proj.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    @Query("SELECT p from Product p Where "+
    "LOWER(p.name) LIKE Lower(CONCAT('%',:keyword,'%')) OR " +
    "LOWER(p.description) LIKE Lower(CONCAT('%',:keyword,'%')) OR " +
    "LOWER(p.brand) LIKE Lower(CONCAT('%',:keyword,'%')) OR " +
    "LOWER(p.category) LIKE Lower(CONCAT('%',:keyword,'%'))"
    )
    List<Product> searchKeyword(String keyword);
}
