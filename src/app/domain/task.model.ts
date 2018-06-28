export interface Task {
    id?: string;
    desc: string;
    completed: boolean;
    priority: number;
    dueDate?: Date;
    reminder?: Date;
    createDate: Date;
    remark?: string;
    ownerId?: string;
    participantsId: string[];
    taskListId:string;
}