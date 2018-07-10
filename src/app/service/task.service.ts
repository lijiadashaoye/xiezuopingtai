import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task, TaskList } from '../domain'
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
    private readonly domain = 'tasks';
    private headers = new Headers({
        'Content-type': 'application/json',
    })
    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl
    ) { }
    add(task: Task): Observable<Task> {
        task.id = null;
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.post(url, JSON.stringify(task), { headers: this.headers })
            .map(res => res.json())
    }

    update(task: Task): Observable<Task> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}/${task.id}`;
        let toUpdate = {
            desc: task.desc,
            priority: task.priority,
            due: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantsId,
            remark: task.remark
        }
        return this.http.patch(url, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json())
    }

    delete(task: Task): Observable<Task> {
        let url = `${this.baseUrl.baseUrl}/taskLists/${task.id}`
        return this.http.delete(url)
            .mapTo(task)
    }

    get(taskListId: String) {
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { 'taskListId': taskListId } })
            .map(res => res.json() as Task[])
    }
    getByLists(lists: TaskList[]): Observable<Task[]> {
        return Observable.from(lists)
            .mergeMap(list => this.get(list.id))
            .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], [])
    }

    complete(task: Task): Observable<Task> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}/${task.id}`;
        return this.http.patch(url, JSON.stringify({ completed: !task.completed }), { headers: this.headers })
            .map(res => res.json())
    }

    move(taskId: string, taskListId: string): Observable<Task> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}/${taskId}`;
        return this.http.patch(url, JSON.stringify({ taskListId: taskListId }), { headers: this.headers })
            .map(res => res.json())
    }

    moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
        return this.get(srcListId).mergeMap(tasks => Observable.from(tasks))
            .mergeMap(task => this.move(task.id, targetListId))
            .reduce((x, y) => [...x, y], [])
    }

    getUserTasks(userId: String) {
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { ownerId: userId } })
            .map(res => res.json() as Task[])
    }
}