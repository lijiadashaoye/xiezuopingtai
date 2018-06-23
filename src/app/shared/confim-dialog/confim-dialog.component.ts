import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confim-dialog',
  template: `
  <h2 md-dialog-title>{{title}}</h2>
  <div md-dialog-actions>
    <button md-raised-button type="button" color="primary" (click)="save('save')">确定</button>
    <button md-button (click)="save()" type="button">取消</button>
  </div>
  `,
  styles: []
})
export class ConfimDialogComponent implements OnInit {
  title='';
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef<ConfimDialogComponent>
  ) { }

  ngOnInit() {
    this.title=this.dialogdata.title;
  }
  save(which) {
    which?this.dialogref.close({ reData:true }):this.dialogref.close({ reData:false })
  }
}
