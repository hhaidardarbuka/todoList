import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_modules/shared/shared.module';
import { TaskStatusFilterPipe } from './_pipes/tasks-status-filter.pipe';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './_store/tasks.reducer';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TasksComponent,
    AddTaskDialogComponent,
    TaskStatusFilterPipe
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    SharedModule,
    MatButtonToggleModule,
    DragDropModule,
    TranslateModule.forChild(),
    FormsModule,
    StoreModule.forFeature('tasks', taskReducer),
  ]
})
export class TasksModule { }
