import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from 'src/app/_enums/status.enum';

@Pipe({
  name: 'taskStatusFilter'
})
export class TaskStatusFilterPipe implements PipeTransform {
  transform(tasks: any[], status: TaskStatus | null): any[] {
    if (!tasks || !status) {
      return tasks;
    }

    return tasks.filter(task => task.status === status || status == null);
  }
}