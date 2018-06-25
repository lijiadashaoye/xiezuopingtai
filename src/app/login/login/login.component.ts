import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginImage = '';
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({                           // 直接指定验证函数
      email: ['', Validators.compose([Validators.required, this.validates])],
      password: ['', Validators.required]
    })
    let num = Math.floor(Math.random() * 10);
    this.loginImage = `assets/img/quotes/${num}.jpg`;
  }
  login() {
    if (this.form.valid) {
      this.router.navigate(['project'])
    }
    // this.form.controls['email'].setValidators(this.validates);  // 动态指定验证函数
  }
  validates(c: FormControl) {  // 自定义验证函数
    if (c.value) {
      return null
    } else {
      return { key: 'ksdflkasjdflk' }
    }
  }
}
