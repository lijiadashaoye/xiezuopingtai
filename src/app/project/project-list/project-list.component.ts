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
import { ProjectService } from '../../service/project.service'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, staggerAnims],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects;
  @HostBinding('@routeAnim') state;
  constructor(
    private dialog: MdDialog,
    private chan: ChangeDetectorRef,
    private service$: ProjectService
  ) { }

  ngOnInit() {
    this.service$.get("1").subscribe(
      project => {
        this.projects = project;
        this.chan.markForCheck()
      })
  }

  openNewProjectDialog() {
    let openDialog = this.dialog.open(NewProjectComponent, {
      data: {
        title: '新增项目'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      if (result) {
        this.projects = [...this.projects, ...result.reData]
        this.chan.markForCheck();
      }

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
      this.chan.markForCheck();
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
      this.chan.markForCheck();
    })
  }

}
