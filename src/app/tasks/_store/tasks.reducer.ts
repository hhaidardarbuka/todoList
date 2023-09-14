import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/_models/task.model';
import { addTask, editTask, loadTasksSuccess, removeTask, updateTaskOrder } from './tasks.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(editTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(removeTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== task.id),
  })),
  on(updateTaskOrder, (state, { tasks }) => {
    return { ...state, tasks };
  })
);
