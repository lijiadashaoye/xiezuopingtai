import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Observable,
  Subscription
} from 'rxjs';
import 'rxjs/observable/range';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  isValidDate
} from '../../utils/date.util';
import {
  extractInfo,
  isValidAddr,
  getAddrByCode
} from '../../utils/identity.util';
import {
  UserService
} from '../../service/user.service';
import {
  MdDialog
} from '@angular/material';
import {
  ConfimDialogComponent
} from '../../shared/confim-dialog/confim-dialog.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items = [];
  form: FormGroup;
  ids;

  title = '请选择';
  cols = 6;
  useSvgIcon = true;
  selectedTab = 0;
  sub: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private dialog: MdDialog, ) {}

  ngOnInit() {
    this.ids = sessionStorage.getItem('persion');

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surePassword: ['', Validators.required],
      avater: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      identity: ['', Validators.required],
      address: ['', Validators.required],
      id: ['']
    })
    Observable.range(1, 16).subscribe(val => {
      this.items.push(`avatar:svg-${val}`)
    })
    let id$ = this.form.get('identity').valueChanges
      .debounceTime(400)
      .filter(_ => this.form.get('identity').valid);
    this.sub = id$.subscribe(id => {
      let info = extractInfo(id.identityNo);

      if (isValidAddr(info.addrCode)) {
        let addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr)
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth)
      }
    })

    if (this.ids) {
      this.service.getPersion(this.ids).subscribe(val => {
        this.form.patchValue({
          email: val[0].email,
          name: val[0].name,
          avater: val[0].avater,
          dateOfBirth: val[0].dateOfBirth,
          identity: val[0].identity,
          address: val[0].address,
          password: val[0].password,
          surePassword: val[0].surePassword,
          id: val[0].id,
        })
      })
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  ischangeImage(e) {
    this.items = [];
    if (e.checked == true) {
      Observable.range(0, 39).subscribe(val => {
        this.items.push(`assets/img/covers/${val}_tn.jpg`)
      })
    } else {
      Observable.range(1, 16).subscribe(val => {
        this.items.push(`avatar:svg-${val}`)
      })
    }
    this.useSvgIcon = !e.checked
  }
  historyBack(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.touched) {
      let openDialog = this.dialog.open(ConfimDialogComponent, {
        data: {
          title: '数据有更改，保存吗？',
        }
      });
      openDialog.afterClosed().subscribe(result => {
        if (result.reData) {
          this.save(ev);
        }else{
          history.back()
        }
      })
    } else {
      history.back()
    }
  }
  save(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    if (!this.form.get('password').value || !this.form.get('surePassword').value) {
      this.dialog.open(ConfimDialogComponent, {
        data: {
          title: '请输入密码!',
          which: true
        }
      });
      return
    }

    if (this.form.get('password').value != this.form.get('surePassword').value) {
      this.dialog.open(ConfimDialogComponent, {
        data: {
          title: '两次密码输入不相同，请重新输入!',
          which: true
        }
      });
      return
    }
    if (this.ids) {
      this.service.setPersion(this.form.value).subscribe(val => {
        if (val == true) {
          let openDialog = this.dialog.open(ConfimDialogComponent, {
            data: {
              title: '保存成功!',
              which: true
            }
          });
          openDialog.afterClosed().subscribe(result => {
            history.back()
          })
        }
      })
    } else {
      this.service.addPersion(this.form.value).subscribe(val => {
        if (val == true) {
          let openDialog = this.dialog.open(ConfimDialogComponent, {
            data: {
              title: '保存成功!',
              which: true
            }
          });
          openDialog.afterClosed().subscribe(result => {
            history.back()
          })
        }
      })
    }
  }

  onTabChange(index) {
    this.selectedTab = index;
  }
  selectedTabClick() {
    this.selectedTab = 0
  }
}
