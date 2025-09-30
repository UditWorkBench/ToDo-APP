export type Status = 'Pending' | 'In Progress' | 'Completed';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: Status;
  lastUpdateOn: number;
}

export interface TodoGroupByStatus {
  Pending: Todo[];
  ['In Progress']: Todo[];
  Completed: Todo[];
}
