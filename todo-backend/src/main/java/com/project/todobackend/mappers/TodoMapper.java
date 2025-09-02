package com.project.todobackend.mappers;

import com.project.todobackend.DTOs.TodoDTO;
import com.project.todobackend.entity.Todo;

public class TodoMapper {
    public static TodoDTO toDTO(Todo todo){
        return new TodoDTO(
                todo.getId(),
                todo.getTask(),
                todo.isCompleted()
        );
    }

    public static Todo toEntity(TodoDTO dto){
        Todo todo = new Todo();
        todo.setId(dto.getId());
        todo.setTask(dto.getTask());
        todo.setCompleted(dto.getCompleted());
        return todo;
    }
}
