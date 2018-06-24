import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  MdDialog
} from '@angular/material';
import {
  NewProjectComponent
} from '../new-project/new-project.component';
import {
  InviteComponent
} from '../invite/invite.component';
import {
  ConfimDialogComponent
} from '../../shared/confim-dialog/confim-dialog.component';
import {
  slideToRight
} from '../../anims/router.anim';
import {
  staggerAnims
} from '../../anims/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, staggerAnims],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects = [{
      id: 1,
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
      name: 'asdasdfa',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/1.jpg'
    }
  ];
  @HostBinding('@routeAnim') state;
  constructor(
    private dialog: MdDialog,
    private chan:ChangeDetectorRef
  ) {}

  ngOnInit() {}
  openNewProjectDialog() {
    let openDialog = this.dialog.open(NewProjectComponent, {
      data: {
        title: '新增项目'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      this.projects=[...this.projects,...result.reData]
      this.chan.markForCheck();
    })
  }
  editClick() {
    let openDialog = this.dialog.open(NewProjectComponent, {
      data: {
        title: '编辑项目'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  toInvite() {
    let openDialog = this.dialog.open(InviteComponent);
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  toDelete() {
    let openDialog = this.dialog.open(ConfimDialogComponent, {
      data: {
        title: '确定删除吗？'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

}
