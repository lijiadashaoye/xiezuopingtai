import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Router
} from '@angular/router'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>()
  constructor(
    private router: Router
  ) { }
  ngOnInit() { }
  toTask(type) {
    switch (type) {
      case 'project': this.router.navigate(['project']); break;
      case 'month': this.router.navigate(['task']); break;
      case 'week': this.router.navigate(['project']); break;
      case 'day': this.router.navigate(['project']); break;
      case 'login': this.router.navigate(['login']); break;
    }
    this.toggle.emit()

  }
}
