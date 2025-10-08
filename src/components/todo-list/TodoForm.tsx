import React, { useState, useEffect } from 'react';
import { Status, Todo } from '../../types/todo.types';
import { StatusDropdown } from './../helpers/StatusDropdown';

interface Props {
  onSubmit: (title: string, description: string, status: Status) => void;
  editTodo?: Todo | null;
  onCancel?: () => void;
}

const TodoForm: React.FC<Props> = ({ onSubmit, editTodo, onCancel}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState<Status>('Pending');

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo?.title);
      setDesc(editTodo?.description);
      setStatus(editTodo?.status);
    }
  }, [editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title?.trim() && desc?.trim()) {
      onSubmit(title, desc, status);
      setTitle('');
      setDesc('');
      setStatus('Pending');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <input
          id="task-title"
          name="title"
          type="text"
          placeholder="Enter the title"
          value={title}
          aria-label="task title"
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          id="task-desc"
          name="desc"
          placeholder="Enter the description"
          value={desc}
          aria-label="task description"
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div className="dropdown-wrapper">
        {editTodo && <StatusDropdown value={status} onChange={setStatus} />}
      </div>
      <div className="button-group">
        {onCancel && <button id="cancel-btn" type="button" onClick={onCancel} className="cancel-btn">Cancel</button>}
        <button id="submit-btn" type="submit" className="update-btn">{editTodo ? 'Update' : 'Add'}</button>
      </div>
    </form>
  );
};

export default TodoForm;