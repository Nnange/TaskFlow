package com.project.todobackend.repository;

import com.project.todobackend.entity.Todo;
import com.project.todobackend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    void deleteByCompletedTrue();

    List<Todo> findByUser(User user);

    @Transactional
    @Modifying
    @Query("DELETE FROM Todo t WHERE t.completed = true")
    void deleteCompletedTodos();
}
