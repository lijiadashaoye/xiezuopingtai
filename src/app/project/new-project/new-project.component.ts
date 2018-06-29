import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MD_DIALOG_DATA,
  MdDialogRef
} from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/observable/range';
import { isNumber } from 'util';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  titles = '';
  form: FormGroup;
  items = [];

  title = '请选择封面';
  cols = 6;
  useSvgIcon;
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef<NewProjectComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.titles = this.dialogdata.title;
    this.useSvgIcon = this.dialogdata.useSvgIcon;
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      desc: [''],
      coverImage: ['']
    })
    if (this.dialogdata.project) {
      this.form.get('name').patchValue(this.dialogdata.project.name),
        this.form.get('desc').patchValue(this.dialogdata.project.desc),
        this.form.get('coverImage').patchValue(this.dialogdata.project.coverImg)
      this.ischangeImage({ checked: true })
    } else {
      this.ischangeImage({ checked: false })
    }
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
  save(which) {
    let image;
    if (!this.useSvgIcon) {
      let num = this.form.get('coverImage').value;
      isNumber(num) ? image = `assets/img/covers/${num}.jpg` : image = num;

    } else {
      image = `avatar:svg-${this.form.get('coverImage').value}`
    }
    let obj = {
      name: this.form.get('name').value,
      desc: this.form.get('desc').value,
      coverImg: image,
    }
    let datas = { ...this.dialogdata.project, ...obj };
    which ? this.dialogref.close({
      reData: datas
    }) : this.dialogref.close()
  }
}
