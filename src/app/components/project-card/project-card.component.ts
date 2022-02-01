import { Component, Input, OnInit } from '@angular/core';
import { AllProjectsWithTasksQuery } from '../../../graphql/generated/graphql';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input()
  public projects: AllProjectsWithTasksQuery['allProjects'] = [];
  constructor() {}

  formatDate(date: string) {
    const endDate = new Date(date).toUTCString();
    return endDate.substring(0, 13);
  }
  test(test) {
    console.log(test);
  }
  formatDateTest(date: string) {
    const endDate = new Date(date).toUTCString();
    console.log(date);
    return endDate.substring(0, 13);
  }

  ngOnInit() {}
}
