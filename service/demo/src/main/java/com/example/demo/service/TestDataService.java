package com.example.demo.service;

import com.example.demo.Requests.AddEventByUserReq;
import com.example.demo.module.TestData;
import com.example.demo.repository.TestDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.*;

@Service
public class TestDataService {
    @Autowired
    private TestDataRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // add new Event
    public TestData addEvent(AddEventByUserReq req) {
        TestData data = new TestData();
        data.setEventId(UUID.randomUUID().toString().split("-")[0]);
        data.setCreatDate(new Date());
        data.setEventStatus("Pending");
        data.setEventName(req.getEventName());
        data.setDescription(req.getDescription());
        data.setEndDate(req.getEndDate());
        data.setUserId(req.getUserId());
        return repository.save(data);
    }

    // list all events
    public List<TestData> listAllEvent(TestData data) {
        String userId = data.getUserId();
        return findByUserId(userId);
    }

    // get all data by userId
    public List<TestData> findByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    // list events by events' name
    public List<TestData> getEventByName(String name) {
        return repository.findByEventName(name);
    }

    // list upcoming events
    public List<TestData> findByEndDateBetween(String userId) {
        Calendar calendar = Calendar.getInstance();
        Date now = calendar.getTime();
        calendar.add(Calendar.DAY_OF_MONTH, 5);
        Date fiveDaysLater = calendar.getTime();
        return repository.findByUserIdAndEndDateBetween(userId, now, fiveDaysLater);
    }

    public List<TestData> findByEventNameLikeIgnoreCase(String name) {
        return repository.findByEventNameLikeIgnoreCase(".*" + name + ".*");
    }

    // update event data
    public TestData updateEvent(String id, TestData data) {
        Query query = new Query(Criteria.where("eventId").is(id));
        Update update = new Update()
                .set("eventName", data.getEventName())
                .set("description", data.getDescription())
                .set("eventStatus", data.getEventStatus());
        mongoTemplate.updateFirst(query, update, TestData.class);

        return mongoTemplate.findOne(query, TestData.class);

    }

    // change event's status when client complete it
    public String updateEventStatus(String id) {
        Query query = new Query(Criteria.where("eventId").is(id));
        Update update = new Update()
                .set("eventStatus", "Complete");
        mongoTemplate.updateFirst(query, update, TestData.class);

        return "Congratulation! The test is completed successfully.";
    }

    // delete event by eventId
    public String deleteEvent(String id) {
        repository.deleteById(id);
        return "Data is deleted successfully!";
    }

    // delete events by eventId list
    public String deleteMultEvent(String[] idList) {
        for (String id : idList) {
            repository.deleteById(id);
        }
        return "Data is deleted successfully!";
    }

}
