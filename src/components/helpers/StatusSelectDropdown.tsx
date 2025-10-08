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
        <option value="Pending"><span className="status-dot pending"></span> Pending</option>
        <option value="In Progress"><span className="status-dot"></span> In Progress</option>
        <option value="Completed"><span className="status-dot completed"></span> Completed</option>
      </select>
    </label>
  );
}
