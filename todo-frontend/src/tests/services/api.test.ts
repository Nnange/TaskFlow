import { describe, it, expect, beforeEach } from 'vitest';
import { todoApi, api } from '../../services/api';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(api);

describe('todoApi', () => {
    beforeEach(() => {
        // Reset the mock before each test
        mock.reset();
    });

  it('should fetch all todos', async () => {
    const mockTodos = [{ id: '1', task: 'Test Todo', completed: false }];
    mock.onGet('/api/todos').reply(200, mockTodos); // Mock the GET request

    const todos = await todoApi.getAllTodos();
    expect(todos).toEqual(mockTodos); // Check if the returned todos match the mock
  });

  it('should create a new todo', async () => {
    const mockNewTodo = { id: '2', task: 'New Todo', completed: false };
    mock.onPost('/api/todos').reply(200, mockNewTodo); // Mock the POST request

    const newTodo = await todoApi.createTodo('New Todo');
    expect(newTodo).toHaveProperty('id'); // Check if the new todo has an id
    expect(newTodo.task).toBe('New Todo'); // Check if the task matches
  });

  it('should toggle todo completion status', async () => {
    const todo = { id: '1', task: 'Test Todo', completed: false };
    const updatedTodo = { ...todo, completed: true };
    mock.onPut(`/api/todos/${todo.id}`, { ...todo, completed: true }).reply(200, updatedTodo);

    const result = await todoApi.toggleTodo(todo);
    expect(result).toEqual(updatedTodo); 
  });

  it('should edit a todo', async () => {
    const updatedTodo = { id: '1', task: 'Updated Todo' };
    mock.onPut(`/api/todos/${updatedTodo.id}`, { task: 'Updated Todo' }).reply(200, updatedTodo); // Mock the PUT request

    const result = await todoApi.editTodo(updatedTodo.id, 'Updated Todo');
    expect(result).toEqual(updatedTodo);
  });

  it('should delete a todo', async () => {
    const todoId = '1';
    mock.onDelete(`/api/todos/${todoId}`).reply(204);

    await todoApi.deleteTodo(todoId);
  });

  it('should clear all completed todos', async () => {
    mock.onDelete('/api/todos/completed').reply(204); // Mock the DELETE request for clearing completed todos

    await todoApi.clearCompleted();
  });

  it('should soft delete a todo', async () => {
    const todoId = '1';
    mock.onPatch(`/api/todos/${todoId}/hide`).reply(204);

    await todoApi.softDeleteTodo(todoId);
  });
});