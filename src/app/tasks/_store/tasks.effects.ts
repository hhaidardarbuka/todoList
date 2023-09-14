import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { addTask, editTask, loadTasks, loadTasksFailure, loadTasksSuccess, removeTask, updateTaskOrder } from './tasks.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../_services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private snackbar:MatSnackBar
  ) { }

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError(() => of(loadTasksFailure()))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      mergeMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map(() => loadTasks()), // Reload tasks after adding a new one
          catchError(() => of(loadTasksFailure()))
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTask),
      mergeMap(({ task }) =>
        this.taskService.editTask(task).pipe(
          map(() => loadTasks()), // Reload tasks after editing
          tap(()=>this.snackbar.open("Success")),
          catchError(() => of(loadTasksFailure()))
        )
      )
    )
  );

  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTask),
      mergeMap(({ task }) =>
        this.taskService.removeTask(task).pipe(
          map(() => loadTasks()), // Reload tasks after removing
          tap(()=>this.snackbar.open("Success")),
          catchError(() => of(loadTasksFailure()))
        )
      )
    )
  );

  updateTaskOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskOrder),
      mergeMap(({ tasks }) =>
        this.taskService.updateTasks(tasks).pipe(
          map(() => loadTasks()), // Reload tasks after removing
          catchError(() => of(loadTasksFailure()))
        )
      ),
      catchError((error) => {
        // Handle the error or dispatch an error action
        return of(error);
      })
    ));

}
