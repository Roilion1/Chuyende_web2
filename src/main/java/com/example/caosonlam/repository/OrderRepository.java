package com.example.caosonlam.repository;

import com.example.caosonlam.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findById(long id);
}
