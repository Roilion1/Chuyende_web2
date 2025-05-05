package com.example.caosonlam.service.impl;

import com.example.caosonlam.entity.Order;
import com.example.caosonlam.repository.OrderRepository;
import com.example.caosonlam.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        order.setCreatedAt(new Date());
        order.setStatus(0); // chưa thanh toán
        return orderRepository.save(order);
    }

    @Override
    public void updateOrderStatus(Long orderId, int status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            order.setUpdatedAt(new Date());
            orderRepository.save(order);
        }
    }
}
