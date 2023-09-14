import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/_models/task.model';

// Load Tasks
export const loadTasks = createAction('[Task List] Load Tasks');
export const loadTasksSuccess = createAction('[Task List] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task List] Load Tasks Failure');

export const updateTaskOrder = createAction(
    '[Task] Update Task Order',
    props<{ tasks: Task[] }>()
  );
// Add Task
export const addTask = createAction('[Task List] Add Task', props<{ task: Task }>());
// Edit Task
export const editTask = createAction('[Task List] Edit Task', props<{ task: Task }>());
// Remove Task
export const removeTask = createAction('[Task List] Remove Task', props<{ task: Task }>());
