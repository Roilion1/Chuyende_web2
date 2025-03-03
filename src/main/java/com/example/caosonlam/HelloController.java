package com.example.caosonlam;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class HelloController {
    private String a = "defaultA";
    private String b = "defaultB";

    @GetMapping("/")
    public String index() {
        return "Hello World from Spring Boot";
    }

    @PostMapping("/display")
    public String displayParams(@RequestBody Params params) {
        this.a = params.getA();
        this.b = params.getB();
        return "Received parameters: a = " + this.a + ", b = " + this.b;
    }

    @PutMapping("/update")
    public String updateParams(@RequestBody Params params) {
        this.a = params.getA();
        this.b = params.getB();
        return "Updated parameters: a = " + this.a + ", b = " + this.b;
    }

    @DeleteMapping("/delete")
    public String deleteParams() {
        this.a = null;
        this.b = null;
        return "Deleted parameters: a and b are now null";
    }

    @GetMapping("/get-values")
    public String getValues() {
        return "Current values: a = " + this.a + ", b = " + this.b;
    }
}

class Params {
    private String a;
    private String b;

    public String getA() {
        return a;
    }

    public void setA(String a) {
        this.a = a;
    }

    public String getB() {
        return b;
    }

    public void setB(String b) {
        this.b = b;
    }
}
