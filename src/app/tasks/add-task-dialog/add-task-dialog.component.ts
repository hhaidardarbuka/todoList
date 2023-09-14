import { Component, OnInit } from '@angular/core';
import { EnumWrapper, TaskStatus } from 'src/app/_enums/status.enum';
import { Task } from 'src/app/_models/task.model';
import { addTask } from '../_store/tasks.actions';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {
  task!: Task;
  taskStatusList!: EnumWrapper[];
  constructor(private _store: Store, private _diaglogRef: MatDialogRef<AddTaskDialogComponent>, private _translate:TranslateService) {

  }

  ngOnInit(): void {
    this.task = this.getDefaultTask();
    this.getList();
  }

  addTask() {
    this._store.dispatch(addTask({ task: this.task }));
    this._diaglogRef.close(true);
  }


  // Function to generate a unique ID for new tasks
  private generateRandomId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }

  private getList(){
    this._translate.get("STATUS").subscribe((translate)=>{
      this.taskStatusList = [
        {
          text:  this._translate.instant(translate["PENDING"]),
          value: TaskStatus.Pending
        },
        {
          text:  this._translate.instant(translate["COMPLETED"]),
          value: TaskStatus.Completed
        }
      ];
    })
  }

  private getDefaultTask(): Task {
    return {
      id: this.generateRandomId(5),
      name: "",
      status: TaskStatus.Pending
    } as Task;
  }

}
