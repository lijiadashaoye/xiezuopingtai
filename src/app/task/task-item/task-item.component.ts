import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  icons;
  constructor() { }

  ngOnInit() {
    this.icons=this.item.owner?this.item.owner.avatar:'unassigned'
  }

}
