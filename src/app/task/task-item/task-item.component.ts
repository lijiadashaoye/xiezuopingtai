import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Output()itemClick=new EventEmitter()
  icons;
  constructor() { }

  ngOnInit() {
    this.icons=this.item.owner?this.item.owner.avatar:'unassigned'
  }
  checkboxClick(e,item){
    e.stopPropagation();
    item.completed=e.checked
  }
  onItemClick(){
    this.itemClick.emit()
  }
}
