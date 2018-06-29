import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
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
import {
  ProjectService
} from '../../service/project.service';
import {
  Subscription
} from 'rxjs'
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, staggerAnims],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects;
  doWhat;
  sub: Subscription;
  @HostBinding('@routeAnim') state;
  constructor(
    private dialog: MdDialog,
    private chan: ChangeDetectorRef,
    private service$: ProjectService,
  ) {}

  ngOnInit() {
    this.sub = this.service$.get('').subscribe(
      project => {
        this.projects = project;
        this.chan.markForCheck()
      })
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  editClick(data) {
    let which
    if (data) {
      this.doWhat = 'edit'
      which = {
        title: '编辑项目',
        project: data,
        useSvgIcon: false
      }
    } else {
      this.doWhat = 'new'
      which = {
        title: '新增项目',
        project: null,
        useSvgIcon: true,
      }
    }
    let openDialog = this.dialog.open(NewProjectComponent, {
      data: which
    });
    openDialog.afterClosed()
      .filter(_ => _)
      .subscribe(result => {
        if (this.doWhat == 'new') {
          this.service$.add(result.reData).subscribe(res => {
            this.projects.push(res)
          })
        }
        if (this.doWhat == 'edit') {
          this.service$.update(result.reData).subscribe(res => {
            let kk = this.projects.filter(item => res.id == item.id)[0];
            let index = this.projects.indexOf(kk)
            this.projects[index] = { ...this.projects[index],
              ...res
            }
          })
        }
        this.chan.markForCheck()
      })
  }
  toInvite() {
    let openDialog = this.dialog.open(InviteComponent);
    openDialog.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
  toDelete(item) {
    let openDialog = this.dialog.open(ConfimDialogComponent, {
      data: {
        title: '确定删除吗？'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      if (result.reData) {
        this.service$.delete(item)
          .subscribe(
            res => {
              this.projects = this.projects.filter(item => res.id != item.id);
              this.chan.markForCheck();
            })
      }
    })
  }

}
