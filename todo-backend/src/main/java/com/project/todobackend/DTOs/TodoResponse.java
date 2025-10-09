package com.project.todobackend.DTOs;

import java.util.UUID;

public class TodoResponse {
    private UUID id;
    private String task;
    private boolean completed;

    public TodoResponse(UUID id, String task, boolean completed) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }

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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
