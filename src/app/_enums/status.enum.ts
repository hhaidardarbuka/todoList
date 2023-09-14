export enum TaskStatus {
    Pending = 1,
    Completed = 2
}

// export const TaskStatusList: EnumWrapper[] = Object.keys(TaskStatus)
//     .map((key: string) => ({ value: TaskStatus[key] as number, text: key }));

export interface EnumWrapper {
    value: number,
    text: string
}