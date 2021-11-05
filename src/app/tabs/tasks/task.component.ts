import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AllTasksLimitQuery } from '../../../generated/graphql';

import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskPage implements OnInit, OnDestroy {
  private tasksLoading: boolean = false;
  public tasks: AllTasksLimitQuery['allTasksLimit'] = [];
  private subscriptions: Array<Subscription> = [];

  constructor(
    private taskService: TaskService,
    private changeRef: ChangeDetectorRef,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.taskService.getTasksObservable(0).subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.allTasksLimit;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
  // goToAddTask() {
  //   this.navCtrl.navigateForward('add-task');
  // }
}
