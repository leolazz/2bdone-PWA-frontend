import { Component, Input, OnInit } from '@angular/core';
import { AllTasksLimitQuery } from '../../../graphql/generated/graphql';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input()
  public tasks: AllTasksLimitQuery['allTasksLimit'] = [];
  constructor() {}

  formatDate(date: string) {
    return date?.substring(0, 10);
  }
  ngOnInit() {}
}
