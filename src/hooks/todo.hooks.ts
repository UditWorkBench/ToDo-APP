import { useState, useEffect } from 'react';
import { Todo, Status } from '../types/todo.types';

const createTodos = () => {
  try {
    const savedData = localStorage.getItem("todo_list");
    return savedData ? JSON.parse(savedData) : [];
  } catch (e) {
    console.log("error in saved data sync");
    return [];
  }
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => createTodos());

  useEffect(() => {
    localStorage.setItem("todo_list", JSON.stringify(todos));
  }, [todos]);


  const addTodoItem = (title: string, description: string, status: Status) => {
    setTodos([...todos, { id: Date.now(), title, description,status, lastUpdateOn : Date.now()}]);
  };

  const updateTodoItem = (title: string, description: string, status: Status, id: number) => {
    if (id) {
      setTodos(todos?.map(todo =>
        todo?.id === id ? { ...todo, title, description, status, lastUpdateOn : Date.now() } : todo
      ));
    }
  };

  const deleteTodoItem = (id: number) => {
    setTodos(todos?.filter(todo => todo?.id !== id));
  };

  return {
    todos,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
  };
};
