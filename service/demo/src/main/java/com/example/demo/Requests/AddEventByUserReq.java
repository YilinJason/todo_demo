package com.example.demo.Requests;

import java.util.Date;

public class AddEventByUserReq {

    private String userId;
    private String eventName;
    private String description;
    private Date endDate;

    public String getUserId() {
        return userId;
    }

    public String getEventName() {
        return eventName;
    }

    public String getDescription() {
        return description;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setEventDescription(String description) {
        this.description = description;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
