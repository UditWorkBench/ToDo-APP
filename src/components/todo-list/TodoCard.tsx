import { Todo } from "../../types/todo.types";

type Props = {
  todo: Todo;
  onEdit: (todoItem: Todo) => void;
  onDelete: (id: number) => void;
};

export function TodoCard({ todo, onEdit, onDelete }: Props) {
    const date = new Date(todo?.lastUpdateOn);
    const avatar = todo?.title?.charAt(0)?.toUpperCase() ?? 'L';
  return (
    <div className="todo-card" role="button" tabIndex={0}>
        <div className="task-tile" role="button" tabIndex={0}>
            <div className="task-info">
                <div className="avatar">{avatar}</div>
                <div className="details">
                    <h5>{todo?.title}</h5>
                    <div className="status"><span className={`status-dot ${todo?.status?.toLowerCase()}`}></span> {todo?.status}</div>
                    <div className="description">{todo?.description}</div>
                    <div className="due-date">{date?.toDateString()}</div>
                    <div className="actions">
                        <button className="edit" onClick={() => onEdit(todo)} tabIndex={-1}>&#x1F589;</button>
                        <button className="delete" onClick={() => onDelete(todo?.id)} tabIndex={-1}>&#x1F5D1;</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}