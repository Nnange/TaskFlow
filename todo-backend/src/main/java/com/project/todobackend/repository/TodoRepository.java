package com.project.todobackend.repository;

import com.project.todobackend.entity.Todo;
import com.project.todobackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    void deleteByCompletedTrue();

    List<Todo> findByUser(User user);
}
