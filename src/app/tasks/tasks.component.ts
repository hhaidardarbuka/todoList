import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { Task } from '../_models/task.model';
import { TaskStatus } from '../_enums/status.enum';
import { ConfirmationDialogComponent } from '../_modules/shared/confirmation-dialog/confirmation-dialog.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { editTask, loadTasks, removeTask, updateTaskOrder } from './_store/tasks.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tasksSelector } from './_store/tasks.selector';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskStatus = TaskStatus;
  listStatus: TaskStatus | null = null;
  // tasks: Task[] = [
  //   {
  //     name: "Task 1",
  //     status: TaskStatus.Pending
  //   }, {
  //     name: "Task 2",
  //     status: TaskStatus.Completed
  //   }, {
  //     name: "Task 3",
  //     status: TaskStatus.Completed
  //   }, {
  //     name: "Task 4",
  //     status: TaskStatus.Pending
  //   }, {
  //     name: "Task 5",
  //     status: TaskStatus.Completed
  //   },
  // ];

  tasks$!: Observable<Task[]>;

  constructor(private store: Store, private _dialog: MatDialog) {}

  ngOnInit() {
    this.tasks$ = this.store.select(tasksSelector);
    this.store.dispatch(loadTasks());
  }


  removeTask(task: Task) {
    this._dialog.open(ConfirmationDialogComponent).afterClosed().subscribe(result => {
      if (result){
        this.store.dispatch(removeTask({ task }));
      }
      });
  }

  onTaskDropped(event : any,tasks:Task[]): void {
    const clonedTasks = [...tasks]; // Create a shallow clone of the tasks array
    moveItemInArray(clonedTasks, event.previousIndex, event.currentIndex);
    this.store.dispatch(updateTaskOrder({ tasks:clonedTasks }));
  }

  addTask() {
    this._dialog.open(AddTaskDialogComponent, {
      width: "400px",
      autoFocus:"input"
    })
  }

  updateTaskStatus(task: Task, e: any): void {
    const clonedTask = {...task}; // Create a shallow clone of the tasks array
    if (e.checked) {
      clonedTask.status = TaskStatus.Completed;
    } else {
      clonedTask.status = TaskStatus.Pending;
    }
    this.store.dispatch(editTask({ task : clonedTask }));
  }

  filterTasksByStatus(e:MatButtonToggleChange){
    this.listStatus = e.value;
  }


}
