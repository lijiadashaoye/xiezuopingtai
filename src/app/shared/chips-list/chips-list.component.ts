import {
  Component,
  OnInit,
  Input,
  forwardRef,
  OnDestroy
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NG_VALIDATORS
} from '@angular/forms'
import {
  Observable,
  Subscription
} from 'rxjs';
import {
  User
} from '../../domain/user.model';
import {
  UserService
} from '../../service/user.service'
@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements ControlValueAccessor {
  form: FormGroup;
  items: User[] = [];
  memberResults$: Observable < User[] > ;
  private propagateChange = (_: any) => {};
  @Input() multiple = true;
  @Input() placeholderText = "请输入成员 email";
  @Input() label = "添加/修改成员";


  constructor(private fb: FormBuilder, private service: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['sdf']
    })
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(400)
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str))
  }
  writeValue(obj: User[]): void {
    if (this.multiple && obj) {
      let userEntities = obj.reduce((e, c) => ({ ...e,
        c
      }), {});
      if (this.items) {
        let remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj]
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj]
    }
  };
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  };
  registerOnTouched(fn: any): void {

  };
  validate(c: FormControl) {
    return this.items ? null : {
      chipListInvalid: true
    }
  }
  removeMember(member: User) {
    let ids = this.items.map(item => item.id);
    let inde = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, inde), ...this.items.slice(inde + 1)];
    } else {
      this.items = []
    }
    this.form.patchValue({
      memberSearch: []
    });
    this.propagateChange(this.items);
  }
  handerMemberSelection(member: User) {
    if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({
      memberSearch: member.name
    });
    this.propagateChange(this.items);
  }
  displayUser(user: User): string {
    return user ? user.name : ''
  }
  get displayInput() {
    return this.multiple || this.items.length === 0
  }
}
