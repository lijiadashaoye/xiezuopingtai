import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() inviteOutput = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() toDelete = new EventEmitter()
  constructor() {}

  ngOnInit() {}
  toDo(which) {
    switch (which) {
      case 'edit':
        this.inviteOutput.emit();
        break;
      case 'invite':
        this.editClick.emit();
        break;
      case 'delete':
        this.toDelete.emit();
        break;
    }
  }
}
