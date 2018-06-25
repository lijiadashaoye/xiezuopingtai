import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/observable/range';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surePassword: ['', Validators.required],
      avater: ''
    })
    Observable.range(1, 16).subscribe(val => {
      this.items.push(`avatar:svg-${val}`)
    })
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
  onSubmit() {
    if (this.form.valid) {
      history.back()
    }
  }
  historyBack(e: Event) {
    e.stopPropagation()
    history.back()
  }
}
