import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  AllTasksLimitQuery,
  Exact,
  GetTasksQuery,
} from '../../../graphql/generated/graphql';
import { TaskService } from '../../services/task/task.service';
import { take } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskPage implements OnInit, OnDestroy {
  private tasksLoading: boolean = false;
  public tasks: AllTasksLimitQuery['allTasksLimit'] = [];
  private subscriptions: Array<Subscription> = [];
  public limit: number = 10;
  public offset: number = 0;
  private queryRef: QueryRef<
    GetTasksQuery,
    Exact<{
      limit?: number;
      offset?: number;
    }>
  >;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.queryRef = this.taskService.getTasksWatch(this.limit, this.offset);
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.getTasks;
      })
    );
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
          feed: [...previousResult.getTasks, ...fetchMoreResult.getTasks],
        });
      },
    });
  }

  loadDataInfinite(event) {
    this.getMoreTasks().then((x) => {
      let data = x?.data?.getTasks;
      this.tasks = this.tasks.concat(data);
      event.target.complete();
    });
  }

  // async getTasks() {
  //   this.offset = this.offset + 10;
  //   this.taskService
  //     .getTasks(this.limit, this.offset)
  //     .pipe(take(1))
  //     .subscribe((x) => {
  //       this.tasksLoading = x.loading;
  //       this.tasks = this.tasks.concat(x?.data?.getTasks);
  //     });
  // }
  // loadData(event) {
  //   this.getTasks().finally(() => {
  //     event.target.complete();
  //   });
  // }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
  // goToAddTask() {
  //   this.navCtrl.navigateForward('add-task');
  // }
}
