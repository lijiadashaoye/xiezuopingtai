import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { TaskService } from '../../service/task.service'

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent implements OnInit {
  viewDate: Date;
  view$: Observable<string>;
  events$: Observable<CalendarEvent[]>
  constructor(
    private route: ActivatedRoute,
    private service:TaskService
  ) {
    this.viewDate = new Date();
    this.view$ = this.route.paramMap.map(p => p.get('view'))

  }

  ngOnInit() {
  }

}
