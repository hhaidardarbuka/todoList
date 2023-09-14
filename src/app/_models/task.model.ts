import { TaskStatus } from "../_enums/status.enum";

export interface Task{
    id:string;
    name: string;
    status: TaskStatus
}