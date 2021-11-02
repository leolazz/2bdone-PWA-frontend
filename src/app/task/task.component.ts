import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllTasksLimitQuery } from '../../generated/graphql';
import { TaskService } from '../services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private tasksLoading: boolean = false;
  public tasks: AllTasksLimitQuery['allTasksLimit'] = [];
  private subscriptions: Array<Subscription> = [];

  constructor(
    private taskService: TaskService,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.taskService.getTasksObservable(10).subscribe((x) => {
        console.log('hi');

        this.tasksLoading = x.loading;
        this.tasks = x?.data?.allTasksLimit;
        console.log(this.tasks);
        // this.changeRef.markForCheck();
        // this.changeRef.detectChanges();
      })
    );
    console.log(this.tasks);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
