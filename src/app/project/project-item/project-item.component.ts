import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() inviteOutput=new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  toInvite() {
    this.inviteOutput.emit()
  }
}
