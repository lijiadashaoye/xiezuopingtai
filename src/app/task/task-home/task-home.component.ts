import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {
  MdDialog
} from '@angular/material';
import {
  NewTaskComponent
} from '../new-task/new-task.component';
import {
  CopyTaskComponent
} from '../copy-task/copy-task.component';
import {
  ConfimDialogComponent
} from '../../shared/confim-dialog/confim-dialog.component';
import {
  NewTaskListComponent
} from '../new-task-list/new-task-list.component';
import {
  slideToRight
} from '../../anims/router.anim'
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {
  lists = [{
      id: 1,
      name: '待办',
      tasks: [{
          id: 1,
          desc: '任务一：吃饭',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatar:svg-3'
          },
          dueDate: new Date()
        },
        {
          id: 1,
          desc: '任务二：阿斯顿发发刚刚才vsadfasdfasdfasdfb多个',
          completed: false,
          priority: 2,
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
      tasks: [{
          id: 1,
          desc: '任务一：拉屎',
          completed: false,
          reminder: true,
          priority: 2,
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
          priority: 1,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-8'
          },
          dueDate: new Date()
        },
      ]
    },
    {
      id: 1,
      name: '已完成',
      tasks: [{
          id: 1,
          desc: '任务一：喝水',
          completed: false,
          reminder: false,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatar:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 1,
          desc: '任务二：dfadfaxcbbxcvb',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-7'
          },
          dueDate: new Date()
        },
      ]
    }
  ]
  constructor(private dialog: MdDialog) {}
  @HostBinding('@routeAnim') state;
  ngOnInit() {}
  onNewTask() {
    let openDialog = this.dialog.open(NewTaskComponent, {
      data: {
        title: '创建任务'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  onItemClick(item) {
    let openDialog = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务',
        item: item
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  onMoveAll(header) {
    let openDialog = this.dialog.open(CopyTaskComponent, {
      data: {
        lists: this.lists.filter(item => item.name != header),
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  headerDelete() {
    let openDialog = this.dialog.open(ConfimDialogComponent, {
      data: {
        title: '确定删除吗？'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  newTaskList() {
    let openDialog = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '新建列表'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  changeListNames(list) {
    let openDialog = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '修改列表名称'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      result ? list.name = result : null
      console.log(result)
    })
  }
  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handing item');
        break;
      case 'task-list':
        console.log('handing list');
        break;
      default:
        break;
    }
  }
}
