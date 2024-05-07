package com.example.demo.repository;

import com.example.demo.module.TestData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface TestDataRepository extends MongoRepository<TestData, String> {

    List<TestData> findByUserId(String userId);

    List<TestData> findByEventName(String name);

    List<TestData> findByEndDateBetween(Date from, Date to);

    @Query(value = "{ 'fieldName' : { $regex: ?0, $options: 'i' } }")
    List<TestData> findByEventNameLikeIgnoreCase(String name);
}
