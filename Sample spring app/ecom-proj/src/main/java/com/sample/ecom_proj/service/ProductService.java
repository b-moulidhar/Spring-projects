package com.sample.ecom_proj.service;

import com.sample.ecom_proj.model.Product;
import com.sample.ecom_proj.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(int prodId){
        return repo.findById(prodId).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes()); // store actual binary data
        return repo.save(product);
    }

    public Product getImageById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes()); // store actual binary data
        return repo.save(product);
    }

    public void deleteProduct(int id) {
        repo.deleteById((id));
    }

    public List<Product> searchProducts(String query) {
        return repo.searchKeyword(query);
    }
}
