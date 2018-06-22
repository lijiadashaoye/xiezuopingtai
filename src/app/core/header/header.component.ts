import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();
  @Output() change = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  openSidebar() {
    this.toggle.emit()
  }
  onChange(boo) {
    this.change.emit(boo.checked)
  }
}
