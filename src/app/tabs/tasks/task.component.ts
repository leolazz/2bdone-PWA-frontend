import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AllTasksLimitQuery,
  Exact,
  PaginatedTasksQuery,
  PaginatedTasksQueryVariables,
} from '../../../graphql/generated/graphql';
import { TaskService } from '../../services/task/task.service';
import { QueryRef } from 'apollo-angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskPage implements OnInit, OnDestroy {
  private tasksLoading: boolean = false;
  public tasks: AllTasksLimitQuery['allTasksLimit'] = [];
  public searchedTasks: AllTasksLimitQuery['allTasksLimit'] = [];
  private subscriptions: Array<Subscription> = [];
  public limit: number = 10;
  public offset: number = 0;
  private queryRef: QueryRef<
    PaginatedTasksQuery,
    Exact<{
      limit: number;
      offset: number;
      field: string;
      ascending: boolean;
      isCompleted: boolean;
    }>
  >;
  filterFields = [
    { display: 'Date Created', value: 'createdDate' },
    { display: 'Deadline', value: 'endDate' },
  ];
  searchValue = '';

  pageableOptions: PaginatedTasksQueryVariables;
  paneEnabled = true;
  constructor(
    private taskService: TaskService,
    private menuCtrl: MenuController
  ) {}

  async ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuCtrl.enable(true, 'tasks');
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
  }

  ngOnInit() {
    this.pageableOptions = {
      limit: 20,
      offset: 0,
      field: 'createdDate',
      ascending: false,
      isCompleted: false,
    };
    this.queryRef = this.taskService.getPaginatedTasks(this.pageableOptions);
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.paginatedTasks.items;
      })
    );
  }

  async search() {
    this.searchedTasks = this.tasks.filter(
      (t) =>
        t.title.toLowerCase().startsWith(this.searchValue.toLowerCase()) &&
        t.isCompleted == this.pageableOptions.isCompleted
    );
  }

  updateOptions() {
    this.queryRef.refetch(this.pageableOptions);
  }

  getMoreTasks() {
    return this.queryRef.fetchMore({
      variables: {
        offset: this.tasks.length,
        limit: this.limit,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        Object.assign({}, previousResult, {
          feed: [
            ...previousResult?.paginatedTasks.items,
            ...fetchMoreResult?.paginatedTasks.items,
          ],
        });
      },
    });
  }

  loadDataInfinite(event) {
    this.getMoreTasks().then((x) => {
      let data = x?.data?.paginatedTasks.items;
      this.tasks = this.tasks.concat(data);
      event.target.complete();
    });
    console.log(this.tasks);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
