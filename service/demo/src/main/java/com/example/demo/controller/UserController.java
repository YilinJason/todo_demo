package com.example.demo.controller;


import com.example.demo.module.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User data) {
        return service.addUser(data);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User data) {
        return service.updateUser(data);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable String id) {
        return service.deleteUser(id);
    }

    @PostMapping("/login")
    public String logIn(@RequestBody User user) {
        return service.logIn(user);
    }
}
