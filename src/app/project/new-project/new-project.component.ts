import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MD_DIALOG_DATA,
  MdDialogRef
} from '@angular/material';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  title = '';
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef < NewProjectComponent >
  ) {}

  ngOnInit() {
    this.title = this.dialogdata.title;
  }
  save(which) {
    let obj = {
      id: 3,
      name: 'asdasdfa',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/4.jpg'
    }
    which ? this.dialogref.close({
      reData: [obj,obj,obj,obj]
    }) : this.dialogref.close()
  }
}
