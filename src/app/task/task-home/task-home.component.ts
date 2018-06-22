import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：吃饭',
          completed: true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatar:svg-3'
          },
          dueDate: new Date()
        },
        {
          id: 1,
          desc: '任务二：阿斯顿发发刚刚才vb',
          completed: false,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-6'
          },
          dueDate: new Date()
        },
      ]
    },
    {
      id: 1,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务一：拉屎',
          completed: false,
          reminder:true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatar:svg-4'
          },
          dueDate: new Date()
        },
        {
          id: 1,
          desc: '任务二：阿斯顿发发刚刚才vb',
          completed: false,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-8'
          },
          dueDate: new Date()
        },
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
