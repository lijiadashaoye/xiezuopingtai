import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';
import {
  itemAnim
} from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Output() itemClick = new EventEmitter();
  widerPriority='out';
  icons;
  constructor() {}

  @HostListener('mouseover')
  onMouseOver() {
    this.widerPriority = 'in'
  }
  @HostListener('mouseout')
  onMouseOut() {
    this.widerPriority = 'out'
  }
  ngOnInit() {
    this.icons = this.item.owner ? this.item.owner.avatar : 'unassigned'
  }
  checkboxClick(e, item) {
    e.stopPropagation();
    item.completed = e.checked
  }
  onItemClick() {
    this.itemClick.emit()
  }
}
