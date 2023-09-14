import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from 'src/app/_models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private tasks: Task[] = [];
    private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

    constructor() { }


    getTasks(): Observable<Task[]> {
        return of(this.tasks).pipe(delay(500)); // Simulate an async operation
    }

    addTask(task: Task): Observable<Task> {
        this.tasks.push(task);
        this.tasksSubject.next(this.tasks);
        return of(task).pipe(delay(500)); // Simulate an async operation
    }

    editTask(task: Task): Observable<Task> {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
            this.tasks[index] = task;
            this.tasksSubject.next(this.tasks);
        }
        return of(task).pipe(delay(500)); // Simulate an async operation
    }

    removeTask(task: Task): Observable<Task[]> {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index > -1) {
            this.tasks.splice(index, 1);
            this.tasksSubject.next(this.tasks);
        }
        return of(this.tasks).pipe(delay(500)); // Simulate an async operation
    }

    updateTasks(tasks: Task[]): Observable<Task[]> {
        this.tasksSubject.next(tasks);
        return of(tasks).pipe(delay(500)); // Simulate an async operation
    }
}
