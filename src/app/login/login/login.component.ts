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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  wrong = false;
  form: FormGroup;
  quote: Quote = {
    "cn": "想有发现就要实验，这项实验需要时间。—《神盾局特工》",
    "en": "Discovery requires experimentation, and this experiment will take time.",
    "pic": "/assets/img/quotes/3.jpg"
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private quoteService$: QuoteService,
    private service: UserService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ // 直接指定验证函数
      email: ['', Validators.compose([Validators.required, this.validates])],
      password: ['', Validators.required]
    })

    this.quoteService$.getQuote().subscribe(val => {
      this.quote = val;
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
}
