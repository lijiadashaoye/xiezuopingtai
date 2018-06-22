import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
  }
  openSidebar() {
    this.toggle.emit()
  }
}
