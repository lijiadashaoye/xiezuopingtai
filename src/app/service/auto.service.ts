import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../domain'
import { Observable } from 'rxjs';
import { Project } from '../domain'
@Injectable()
export class AuthService {
    private readonly domain = 'user';
    private headers = new Headers({
        'Content-type': 'application/json'
    })
    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl
    ) { }
    searchUsers(filter: string): Observable<User[]> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { 'email_like': filter } })
            .map(res => res.json() as User[])
    }
    getUsersByProject(projectId: string): Observable<User[]> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { 'projectId': projectId } })
            .map(res => res.json() as User[])
    }
    addProjectRef(user: User, projectId: string): Observable<User> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}/${user.id}`;
        let projectIds = user.projectIds ? user.projectIds : [];
        if (projectIds.indexOf(projectId) > -1) {
            return Observable.of(user)
        }
        return this.http.patch(url, { projectIds: [...projectIds, projectId] }, { headers: this.headers })
            .map(res => res.json() as User)
    }

    removeProjectRef(user: User, projectId: string): Observable<User> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}/${user.id}`;
        let projectIds = user.projectIds ? user.projectIds : [];
        let index = projectIds.indexOf(projectId)
        if (index === -1) {
            return Observable.of(user)
        }
        let toUpdate = projectIds.filter(p => p != projectId);
        return this.http.patch(url, { projectIds: toUpdate }, { headers: this.headers })
            .map(res => res.json() as User)
    }

    batchUpDateProjectRef(project: Project): Observable<User[]> {
        let projectId = project.id;
        let memberIds = project.members ? project.members : [];
        return Observable.from(memberIds).switchMap(id => {
            let url = `${this.baseUrl.baseUrl}/${this.domain}/${id}`;
            return this.http.get(url)
                .map(res => res.json() as User)
                .filter(user => user.projectIds.indexOf(projectId) === -1)
                .switchMap(u => this.addProjectRef(u, projectId))
                .reduce((arr, curr) => [...arr, curr], [])
        })
    }

}