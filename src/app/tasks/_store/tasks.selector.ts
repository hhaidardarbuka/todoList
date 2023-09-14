import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './tasks.reducer';

const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const tasksSelector = createSelector(
  selectTaskState,
  (state) => state.tasks
);
