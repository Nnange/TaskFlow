package com.project.todobackend.service;

import com.project.todobackend.DTOs.TodoDTO;
import com.project.todobackend.entity.Todo;
import com.project.todobackend.mappers.TodoMapper;
import com.project.todobackend.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/*
Service Layer → keeps business logic separate from controllers.

If later you add things like authentication, validation, or notifications, you put them here.

📌 Role: The logic brain that decides what happens before talking to the database.
*/
@Service
public class    TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<TodoDTO> getAllTodos() {
        return todoRepository.findAll()
                .stream()
                .map(TodoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TodoDTO addTodo(TodoDTO dto){
        Todo saved = todoRepository.save(TodoMapper.toEntity(dto));
        return TodoMapper.toDTO(saved);
    }
    public TodoDTO updateTodo(UUID id, TodoDTO updatedDto){
        updatedDto.setId(id);
        Todo saved = todoRepository.save(TodoMapper.toEntity(updatedDto));
        return TodoMapper.toDTO(saved);
    }
    public void deleteTodo(UUID id){
        todoRepository.deleteById(id);
    }
    @Transactional
    public void clearCompletedTodos(){
        todoRepository.deleteByCompletedTrue();
    }
}
