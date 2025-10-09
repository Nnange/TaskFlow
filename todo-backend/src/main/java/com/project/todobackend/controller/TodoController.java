package com.project.todobackend.controller;

import com.project.todobackend.DTOs.TodoDTO;
import com.project.todobackend.DTOs.TodoResponse;
import com.project.todobackend.entity.Todo;
import com.project.todobackend.entity.User;
import com.project.todobackend.repository.TodoRepository;
import com.project.todobackend.repository.UserRepository;
import com.project.todobackend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private UserRepository userRepository;

    /// ///////////////

    @GetMapping
    public List<TodoResponse> getTodos(Authentication authentication) {
        String email = authentication.getName(); // logged-in username
        User user = userRepository.findByEmail(email).orElseThrow();
        return todoRepository.findByUser(user)
                .stream()
                .map(todo -> new TodoResponse(todo.getId(), todo.getTask(), todo.isCompleted()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public TodoResponse createTodo(@RequestBody Todo todo, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        todo.setUser(user); // assign todo to this user
        Todo saved =  todoRepository.save(todo);

        return new TodoResponse(saved.getId(), saved.getTask(), saved.isCompleted());
    }

    @PutMapping("/{id}")
    public TodoResponse updateTodo(@PathVariable UUID id, @RequestBody Todo updatedTodo, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Todo todo = todoRepository.findById(id).orElseThrow();
        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not allowed to edit this todo!");
        }

        todo.setTask(updatedTodo.getTask());
        todo.setCompleted(updatedTodo.isCompleted());
        Todo updated = todoRepository.save(todo);

        return new TodoResponse(updated.getId(), updated.getTask(), updated.isCompleted());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable UUID id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Todo todo = todoRepository.findById(id).orElseThrow();
        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not allowed to delete this todo!");
        }

        todoRepository.delete(todo);

        return ResponseEntity.ok("Todo has been deleted!");
    }

    @DeleteMapping("/completed")
    public  ResponseEntity<?> deleteAllCompleted(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        todoRepository.deleteCompletedTodos();

        return ResponseEntity.ok("All completed Todos have been deleted!");
    }

}
