import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  AllProjectsWithTasksQuery,
  Exact,
  PaginatedProjectsQuery,
  PaginatedProjectsQueryVariables,
} from '../../../graphql/generated/graphql';

import { ProjectService } from '../../services/projects/project.service';

@Component({
  selector: 'project-tab',
  templateUrl: 'project.page.html',
  styleUrls: ['project.page.scss'],
})
export class ProjectPage implements OnInit, OnDestroy {
  private projectsLoading: boolean = false;
  public projects: AllProjectsWithTasksQuery['allProjects'] = [];
  private subscriptions: Array<Subscription> = [];
  public limit: number = 10;
  public offset: number = 0;
  private queryRef: QueryRef<
    PaginatedProjectsQuery,
    Exact<{
      limit: number;
      offset: number;
      field: string;
      ascending: boolean;
    }>
  >;
  pageableOptions: PaginatedProjectsQueryVariables;
  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.pageableOptions = {
      limit: 20,
      offset: 0,
      field: 'createdDate',
      ascending: false,
    };
    this.queryRef = this.projectService.getPaginatedProjects(
      this.pageableOptions
    );
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.projectsLoading = x.loading;
        this.projects = x?.data?.paginatedProjects.items;
      })
    );
  }
  getMoreProjects() {
    return this.queryRef.fetchMore({
      variables: {
        offset: this.projects.length,
        limit: this.limit,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        Object.assign({}, previousResult, {
          feed: [
            ...previousResult?.paginatedProjects.items,
            ...fetchMoreResult?.paginatedProjects.items,
          ],
        });
      },
    });
  }
  loadDataInfinite(event) {
    this.getMoreProjects().then((x) => {
      let data = x?.data?.paginatedProjects.items;
      this.projects = this.projects.concat(data);
      event.target.complete();
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
