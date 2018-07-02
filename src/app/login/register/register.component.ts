import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy
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
import {
  ActivatedRoute
} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  items = [];
  form: FormGroup;
  ids;
  type;
  findBackData;

  title = '请选择';
  cols = 6;
  useSvgIcon = true;
  selectedTab = 0;
  sub: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private dialog: MdDialog,
    private route: ActivatedRoute,
    private elem: ElementRef,
    private rd: Renderer2
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.type = val.type;
    })
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
    if (this.type == 'find') {
      this.form.get('name').valueChanges
        .debounceTime(400)
        .subscribe(val => {
          let emails = this.form.get('email').touched;
          if (emails) {
            this.service.searchUsers(this.form.get('email').value)
              .subscribe(vals => {
                if (vals) {
                  let nameData = this.form.get('name').value;
                  let emailData = this.form.get('email').value;
                  for (let i = 0; i < vals.length; i++) {
                    if (vals[i].name == nameData && vals[i].email == emailData) {
                      this.form.get('password').patchValue(vals[i].password);
                      vals[i]['avater'] ? this.form.get('avater').patchValue(vals[i]['avater']) : '';
                      let pass = this.elem.nativeElement.querySelector('#pass');
                      this.rd.setStyle(pass, 'background', '#f7c3c3');
                      this.findBackData = vals[i];

                    }
                  }
                }
              })
          } else {
            let emai = this.elem.nativeElement.querySelector('#emaild');
            let nam = this.elem.nativeElement.querySelector('#named');
            if (emai) {
              this.rd.setStyle(emai, 'background', '#c48383');
              this.rd.setStyle(nam, 'background', '#c48383');
              setTimeout(() => {
                this.rd.setStyle(emai, 'background', 'none');
                this.rd.setStyle(nam, 'background', 'none');
              }, 3000);
            }

          }
        })
      this.form.get('surePassword').valueChanges.subscribe(_ => {
        let pass = this.elem.nativeElement.querySelector('#pass');
        this.rd.setStyle(pass, 'background', 'none');
      })
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.form.patchValue({
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
    sessionStorage.removeItem('persion');
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
        } else {
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
  getPassword(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    let password = this.form.get('password').value;
    let surePassword = this.form.get('surePassword').value;

    if (password == surePassword) {
      this.service.setPersion(this.findBackData).subscribe(val => {
        if (val == true) {
          let openDialog = this.dialog.open(ConfimDialogComponent, {
            data: {
              title: '成功找回，请登录！',
              which: true
            }
          });
          openDialog.afterClosed().subscribe(result => {
            history.back()
          })
        }
      })
    } else {
      this.dialog.open(ConfimDialogComponent, {
        data: {
          title: '两次密码输入不相同，请重新输入!',
          which: true
        }
      });
    }
  }
}
