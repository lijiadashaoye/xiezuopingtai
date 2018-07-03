import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms'
import {
  QuoteService
} from '../../service/quote.service'
import {
  Quote
} from '../../domain/quote.model';
import 'rxjs/observable/from'
import {
  UserService
} from '../../service/user.service';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  wrong = false;
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private quoteService$: QuoteService,
    private service: UserService,
    private store$: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({ // 直接指定验证函数
      email: ['', Validators.compose([Validators.required, this.validates])],
      password: ['', Validators.required]
    })

    this.quote$ = this.store$.select(state => state.quote.quote);

    this.quoteService$.getQuote().subscribe(val => {
      this.store$.dispatch({ type: actions.QUOTE_SUCCESS, payload: val })
    })
    
  }
  login() {
    if (this.form.valid) {
      this.service.searchUsers(this.form.get('email').value).subscribe(res => {
        let user = res.filter(item => item.password == this.form.get('password').value);
        if (user.length > 0) {
          this.service.getPersion(user[0].id).subscribe(val => {
            sessionStorage.setItem('persion', val[0].id);
            this.router.navigate(['project']);
          })
        } else {
          this.wrong = true;
          setTimeout(() => this.wrong = false, 3000)
        }
      })
    }
    // this.form.controls['email'].setValidators(this.validates);  // 动态指定验证函数
  }
  validates(c: FormControl) { // 自定义验证函数
    if (c.value) {
      return null
    } else {
      return {
        key: 'ksdflkasjdflk'
      }
    }
  }
  toRegister(type) {
    this.router.navigate(['login/register'], { queryParams: { type: type } })
  }
}
