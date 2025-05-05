package com.example.caosonlam.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest implements Serializable {

    private String status;
    private String message;
    private String URL;
}
