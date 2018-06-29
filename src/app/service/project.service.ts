import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain'
import { Observable } from 'rxjs';
@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new Headers({
        'Content-type': 'application/json'
    })
    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl
    ) { }
    add(project: Project): Observable<Project> {
        project.id = null;
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.post(url, JSON.stringify(project), { headers: this.headers })
            .map(res => res.json())
    }

    update(project: Project): Observable<Project> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}/${project.id}`;
        let toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        }
        return this.http.patch(url, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json())
    }

    delete(project: Project): Observable<Project> {
        let delTasks$ = Observable.from(project.taskLists?project.taskLists:[])
            .mergeMap(listId => this.http.delete(`${this.baseUrl.baseUrl}/taskLists/${listId}`))
            .count();
        return delTasks$.switchMap(_ => this.http.delete(`${this.baseUrl.baseUrl}/${this.domain}/${project.id}`))
            .mapTo(project)
    }

    get(userId: String) {
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { 'members_like': userId } })
            .map(res => res.json() as Project[])
    }
}