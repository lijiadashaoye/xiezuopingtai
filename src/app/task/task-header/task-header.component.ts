import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = '';
  @Output() newTask=new EventEmitter();
  @Output() moveAll=new EventEmitter();
  @Output() headerDelete=new EventEmitter();
  @Output() changeListName=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onNewTask(){
    this.newTask.emit()
  }
  onMoveAllClick(){
    this.moveAll.emit(this.header)
  }
  onDeleteClick(){
    this.headerDelete.emit()
  }
  changeListNames(){
    this.changeListName.emit()
  }
}
