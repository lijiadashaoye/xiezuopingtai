import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  QuoteService
} from './quote.service';
import {
  ProjectService
} from './project.service';
import {
  TaskListService
} from './task-list.service';
import {
  TaskService
} from './task.service';
import {
  UserService
} from './user.service';
import {
  AuthService
} from './auth.service';
import {
  AuthGuardService
} from './auth-guard.service';
@NgModule()
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        UserService,
        AuthService,
        AuthGuardService
      ]
    }
  }
}
