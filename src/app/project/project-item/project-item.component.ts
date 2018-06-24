import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';
import {
  cardAnim
} from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim]
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() inviteOutput = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() toDelete = new EventEmitter();
  @HostBinding('@card') cardState = 'out';
  constructor() {}
  @HostListener('mouseover')
  onmouseenter() {
    this.cardState = 'hover'
  }
  @HostListener('mouseout')
  onmouseleave() {
    this.cardState = 'out'
  }
  ngOnInit() {}
  toDo(which) {
    switch (which) {
      case 'invite':
        this.inviteOutput.emit();
        break;
      case 'edit':
        this.editClick.emit();
        break;
      case 'delete':
        this.toDelete.emit();
        break;
    }
  }
}
