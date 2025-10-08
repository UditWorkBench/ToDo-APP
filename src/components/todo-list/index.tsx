// src/App.tsx
import { useState } from "react";
import { useTodos } from "../../hooks/todo.hooks";
import TodoForm  from "./TodoForm";
import { TodoList } from "./TodoList";
import { Todo, Status } from "../../types/todo.types";
import { Header } from "../helpers/Header";

type View = { mode: "list" } | { mode: "add" } | { mode: "edit"; todo: Todo };

export default function TodoApp() {
  const { todos, addTodoItem, updateTodoItem, deleteTodoItem } = useTodos();
  const [view, setView] = useState<View>({ mode: "list" });

  if (view.mode === "add") {
    return (
      <div className="fullscreen">
        <Header title="Add Task" onBack={() => setView({ mode: "list" })} />
        <TodoForm
          onSubmit={(title: string, description: string, status: Status) => {
            addTodoItem(title, description, status);
            setView({ mode: "list" });
          }}
          onCancel={() => setView({ mode: "list" })}
        />
      </div>
    );
  }

  if (view.mode === "edit") {
    return (
      <div className="fullscreen">
        <Header title="Edit Task" onBack={() => setView({ mode: "list" })} />
        <TodoForm
          editTodo={view.todo}
          onSubmit={(title: string, description: string, status: Status) => {
            updateTodoItem(title, description, status, view?.todo?.id);
            setView({ mode: "list" });
          }}
          onCancel={() => setView({ mode: "list" })}
        />
      </div>
    );
  }

  // Default: list view
  return (
    <div className="container">
      <Header title="TO-DO APP" />
      <TodoList
        todos={todos}
        onDelete={deleteTodoItem}
        onEdit={todo => setView({ mode: "edit", todo })}
      />
      <button className="add-task-btn" onClick={() => setView({ mode: "add" })}>+</button>
    </div>
  );
}