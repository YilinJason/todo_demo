package com.example.demo.service;


import com.example.demo.module.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User addUser(User data) {
        User existingUser = repository.findByEmail(data.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("Email already exists in the database");
        }
        data.setUserId(UUID.randomUUID().toString().split("-")[0]);
        data.setCreateDate(new Date());
        data.setPassword(this.passwordEncoder.encode(data.getPassword()));
        return repository.save(data);
    }

    public User updateUser(User data) {
        repository.findById(data.getUserId());
        User newData = new User();
        newData.setEmail(data.getEmail());
        newData.setPassword(data.getPassword());
        newData.setUserName(data.getUserName());

        return repository.save(newData);
    }

    public String deleteUser(String id) {
        repository.deleteById(id);
        return "Data is deleted successfully!";
    }

    public User findUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String logIn(User user) {
        User target = findUserByEmail(user.getEmail());
        if(target != null) {
            Boolean isMatch = passwordEncoder.matches(user.getPassword(), target.getPassword());
            if(isMatch){
                return target.getUserName();
            }
            return "Your input password is wrong, please try it again.";
        }
        else {
            return "Your input email is wrong, please try it again.";
        }
    }
}
