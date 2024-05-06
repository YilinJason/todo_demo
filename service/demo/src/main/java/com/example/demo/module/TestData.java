package com.example.demo.module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "testData")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestData {
    @Id
    private String eventId;
    private String eventName;
    private String description;
    private String eventStatus;
    private Date creatDate;
    private Date endDate;

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public void setEventStatus(String eventStatus) {
        this.eventStatus = eventStatus;
    }

    public void setCreatDate(Date creatDate) {
        this.creatDate = creatDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEventId() {
        return eventId;
    }

    public String getEventStatus() {
        return eventStatus;
    }

    public Date getCreatDate() {
        return creatDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public String getEventName() {
        return eventName;
    }

    public String getDescription() {
        return description;
    }
}
