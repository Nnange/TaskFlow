package com.project.todobackend.service;

import com.project.todobackend.entity.Todo;
import com.project.todobackend.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/*
Service Layer → keeps business logic separate from controllers.

If later you add things like authentication, validation, or notifications, you put them here.

📌 Role: The logic brain that decides what happens before talking to the database.
*/
@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo addTodo(Todo todo){
        return todoRepository.save(todo);
    }
    public Todo updateTodo(Long id, Todo updated){
        updated.setId(id);
        return todoRepository.save(updated);
    }
    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }
    @Transactional
    public void clearCompletedTodos(){
        todoRepository.deleteByCompletedTrue();
    }
}
