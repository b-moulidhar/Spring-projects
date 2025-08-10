package com.sample.ecom_proj.controller;

import com.sample.ecom_proj.model.Product;
import com.sample.ecom_proj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
    @Autowired
     private ProductService service;
    @RequestMapping("/")
    public String greet(){
        return "Hello";
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProds(){
        List<Product> products = service.getAllProducts();
        if(!products.isEmpty()){
            return new ResponseEntity<>(products,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/products/{prodId}")
    public ResponseEntity<Product> getProdsById(@PathVariable int prodId){
        Product product = service.getProductById(prodId);
        if(product!=null){
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/product")
    public ResponseEntity<?> addProds(@RequestPart Product product, @RequestPart MultipartFile imageFile){

        try{
        Product product1 = service.addProduct(product, imageFile);
        return new ResponseEntity<>(product1,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/products/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable int id){
        Product product = service.getImageById(id);
        byte[] imageFile = product.getImageData();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(product.getImageType()))
                .body(imageFile);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateData(@PathVariable int id,@RequestPart Product product, @RequestPart MultipartFile imageFile){
        try{
        Product product1 = service.updateProduct(id, product, imageFile);
            if(product1!=null){
                return new ResponseEntity<>("Updated", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        Product product = service.getProductById(id);
        if(product!=null){
            service.deleteProduct(id);
            return new ResponseEntity<>("deleted",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Delete unsuccessful",HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProds(@RequestParam String query){
        System.out.println("searching with "+ query);
        List<Product> products = service.searchProducts(query);
        if (!products.isEmpty()){
            return new ResponseEntity<>(products,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
