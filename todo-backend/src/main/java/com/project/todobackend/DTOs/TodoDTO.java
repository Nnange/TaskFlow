package com.project.todobackend.DTOs;

import java.util.UUID;

public class TodoDTO {
    private UUID id;
    private String task;
    private Boolean completed;

    public TodoDTO() {
    }
    public TodoDTO(UUID id, String task, boolean completed) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }

    //getters and Setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getTask() {
        return task;
    }
    public void setTask(String task) {
        this.task = task;
    }
    public Boolean getCompleted() {
        return completed;
    }
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }


}
