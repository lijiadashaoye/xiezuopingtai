import { Component, OnInit, Output, EventEmitter, HostListener, Host } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  @Output() inpData = new EventEmitter();
  desc: string = ''
  constructor() { }

  ngOnInit() {
  }
  
  @HostListener('keyup.enter') // 此处绑定了多个触发事件方式click、enter
  save() {
    if (this.desc) {
      this.inpData.emit(this.desc);
      this.desc = '';
    }
  }
}
