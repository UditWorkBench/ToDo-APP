import { useMemo, useState } from 'react';
import { Todo, TodoGroupByStatus, Status } from "../../types/todo.types";
import { TodoCard } from "./TodoCard";
import { Accordion } from '../helpers/Accordian';
import { PENDING, INPROGRESS, COMPLETED } from '../../constants/TodoConstants'

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

export function TodoList({ todos, onDelete, onEdit }: Props) {
  const [search, setSearch] = useState('');
  const todoGroupByStatus: TodoGroupByStatus = useMemo(() => {
       const intialData: { [T in Status]: Todo[]} = {
         [PENDING] : [],
         [INPROGRESS]: [],
         [COMPLETED]: [],
       }
       const filteredTodos = search ? todos?.filter(todo => todo?.title?.includes(search)) : todos;
       return filteredTodos?.reduce((acc, todo) => {
        const status = todo?.status;
        if (acc[status]) {
            acc[status]?.push(todo);
        } else {
            acc[status] = [todo]; 
        }
        return acc;
      }, intialData);
  }, [todos, search]);

  if (todos?.length === 0 && false) return <p className='no-todos-disclaimer'>No task yet. Please add</p>; // to show no task disclaimer disabled for now

  return (
    <div className="todo-list">
        <div className="search-container">
            <input type="text" className="search-input" placeholder="Search To-Do" value={search} onChange={e => setSearch(e.target.value)} ></input>
            <span className="search-icon">&#x1F50E;&#xFE0E;</span>
        </div>
        <div className="accordion-list">
        <Accordion title={INPROGRESS} count={todoGroupByStatus[INPROGRESS]?.length}>
            {todoGroupByStatus[INPROGRESS]?.length === 0 ? (
            <p className="no-task-entry">No task item</p>
            ) : (
            todoGroupByStatus[INPROGRESS]?.map(todo => (
            <TodoCard
            key={todo?.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={() => onEdit(todo)}
            />
        )))}
        </Accordion>
        <Accordion title={PENDING} count={todoGroupByStatus[PENDING]?.length}>
            {todoGroupByStatus[PENDING]?.length === 0 ? (
            <p className="no-task-entry">No task item</p>
            ) : (
            todoGroupByStatus[PENDING]?.map(todo => (
            <TodoCard
            key={todo?.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={() => onEdit(todo)}
            />
        )))}
        </Accordion>
        <Accordion title={COMPLETED} count={todoGroupByStatus[COMPLETED]?.length}>
            {todoGroupByStatus[COMPLETED]?.length === 0 ? (
            <p className="no-task-entry">No task item</p>
            ) : (
            todoGroupByStatus[COMPLETED]?.map(todo => (
            <TodoCard
            key={todo?.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={() => onEdit(todo)}
            />
        )))}
        </Accordion>
        </div>
    </div>
  );
}