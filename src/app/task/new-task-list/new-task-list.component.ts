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
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {
  title='';
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef < NewTaskListComponent >
  ) {}

  ngOnInit() {
    this.title=this.dialogdata.title;
  }
  save(which) {
    which ? this.dialogref.close({
      reData: 'new'
    }) : this.dialogref.close()
  }
}
