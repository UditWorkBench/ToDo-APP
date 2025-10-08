import { useState } from 'react';

import { Status } from "../../types/todo.types";
import { STATUSES } from "../../constants/TodoConstants";

type Props = {
  value: Status;
  onChange: (status: Status) => void;
  label?: string;
};

export function StatusDropdown({ value, onChange, label }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (status: Status) => {
    onChange(status);
    setIsOpen(false);
  };

  return (
    <div className="status-dropdown">
      {label && <span>{label}</span>}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-header"
      >
        <span className={`status-dot ${value?.toLowerCase()}`}></span>
        {value || 'Select Status'}
        {!isOpen ? (<span className="dropdown-caret">{">"}</span>) : (<span className="dropdown-caret">{"<"}</span>) }
      </div>
      {isOpen && (
        <div className="status-menu">
          {STATUSES?.map((status) => (
            <div
              key={status}
              onClick={() => handleSelect(status as Status)}
              className={`status-menu-item ${value === status ? 'active' : ''}`}
            >
              <span className={`status-dot ${status?.toLowerCase()}`}></span>{status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
