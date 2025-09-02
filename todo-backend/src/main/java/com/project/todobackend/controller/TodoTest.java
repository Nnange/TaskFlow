package com.project.todobackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class TodoTest {

    @RequestMapping("/api/test")
    public String testConnection() {
        return " Backend is running and reachable";
    }

}
