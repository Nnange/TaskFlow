package com.project.todobackend.controller;

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
    public List<Todo> all() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo add(@RequestBody Todo todo){
        if (todo.getTask() == null || todo.getTask().trim().isEmpty()) {
            throw new IllegalArgumentException("Task cannot be empty");
        }
        todo.setCompleted(false); // default
        return todoService.addTodo(todo);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo){
        return todoService.updateTodo(id, todo);
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
