package com.project.todobackend.controller;

import com.project.todobackend.DTOs.TodoDTO;
import com.project.todobackend.entity.Todo;
import com.project.todobackend.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoDTO> all() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public TodoDTO add(@RequestBody TodoDTO dto){
        if (dto.getTask() == null || dto.getTask().trim().isEmpty()) {
            throw new IllegalArgumentException("Task cannot be empty");
        }
        dto.setCompleted(false); // default
        return todoService.addTodo(dto);
    }

    @PutMapping("/{id}")
    public TodoDTO update(@PathVariable Long id, @RequestBody TodoDTO updatedDto){
        return todoService.updateTodo(id, updatedDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

    // Clear all completed todos
    @DeleteMapping("/completed")
    public void deleteAllCompleted(){
        todoService.clearCompletedTodos();
    }

}
