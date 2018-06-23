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
  @Output() toggle = new EventEmitter < void > ()
  constructor(
    private router: Router
  ) {}
  ngOnInit() {}
  toTask() {
    this.toggle.emit()
    this.router.navigate(['task'])
  }
}
