import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/observable/range';
import 'rxjs/observable/interval';
import 'rxjs/operator/reduce';
import 'rxjs/operator/map';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items = [];
  constructor() { }

  ngOnInit() {
    Observable.range(1,16).subscribe(val=>{
      this.items.push(`avatar:svg-${val}`)
    })
  }

}
