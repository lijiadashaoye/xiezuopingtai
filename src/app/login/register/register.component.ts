import {
  Component,
  OnInit
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
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items = [];
  form: FormGroup;

  title = '请选择';
  cols = 6;
  useSvgIcon = true;
  selectedTab = 0;
  sub: Subscription
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surePassword: ['', Validators.required],
      avater: [''],
      dateOfBirth: ['1990-10-2'],
      identity: '',
      address:''
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
  onSubmit(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.valid) {
      history.back()
    }
  }
  historyBack(e: Event) {
    e.stopPropagation()
    history.back()
  }

  onTabChange(index) {
    this.selectedTab = index;
  }
}
