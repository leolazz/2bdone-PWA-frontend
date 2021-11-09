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

  ngOnInit() {}
}
