package com.example.demo.controller;

import com.example.demo.Requests.AddEventByUserReq;
import com.example.demo.module.TestData;
import com.example.demo.service.TestDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/event")
public class TestDataController {

    @Autowired
    private TestDataService service;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public TestData addEvent(@RequestBody AddEventByUserReq data) {
        return service.addEvent(data);
    }

    @GetMapping("/getall")
    public List<TestData> listAllEvent(TestData data) {
        return service.listAllEvent(data);
    }

    @GetMapping("/getbyname/{name}")
    public List<TestData> getEventByName(@PathVariable String name) {
        return service.getEventByName(name);
    }

    @GetMapping("/getbytime/{userId}")
    public List<TestData> findByEndDateBetween(@PathVariable String userId) {
        return service.findByEndDateBetween(userId);
    }

    @GetMapping("/getbynamelike/{name}")
    public List<TestData> findByEventNameLikeIgnoreCase(@PathVariable String name) {
        return service.findByEventNameLikeIgnoreCase(name);
    }

    @PutMapping("/update/{id}")
    public TestData updateEvent(@PathVariable String id, @RequestBody TestData data) {
        return service.updateEvent(id, data);
    }

    @PutMapping("/complete/{id}")
    public String updateEventStatus(@PathVariable String id) {
        return service.updateEventStatus(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEvent(@PathVariable String id) {
        return service.deleteEvent(id);
    }

    @DeleteMapping("/deleteList")
    public String deleteMultEvent(@RequestBody String[] data) {
        return service.deleteMultEvent(data);
    }

}
