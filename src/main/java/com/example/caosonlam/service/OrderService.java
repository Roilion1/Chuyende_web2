package com.example.caosonlam.service;

import com.example.caosonlam.entity.Order;

public interface OrderService {
    Order createOrder(Order order);

    void updateOrderStatus(Long orderId, int status);
}
