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
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss']
})
export class CopyTaskComponent implements OnInit {
  lists = [];

 constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogref: MdDialogRef < CopyTaskComponent >
  ) {}

  ngOnInit() {
    this.lists=this.data.lists;
  }
  save() {
    this.dialogref.close({
      reData: 'copy task save'
    })
  }
  close(){
    this.dialogref.close();
  }
}
