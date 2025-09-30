import { Status } from "../../types/todo.types";

type Props = {
  value: Status;
  onChange: (status: Status) => void;
  label?: string;
};

export function StatusDropdown({ value, onChange, label }: Props) {
  return (
    <label>
      {label && <span>{label}</span>}
      <select id="status-select" value={value} onChange={e => onChange(e.target.value as Status)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </label>
  );
}
