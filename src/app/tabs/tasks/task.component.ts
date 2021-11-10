import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AllTasksLimitQuery } from '../../../graphql/generated/graphql';
import { TaskService } from '../../services/task/task.service';
import { take } from 'rxjs/operators';

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

  constructor(
    private taskService: TaskService,
    private changeRef: ChangeDetectorRef,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.taskService.getTasks(this.limit, this.offset).subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.getTasks;
      })
    );
  }

  async getTasks() {
    this.offset = this.offset + 10;
    this.taskService
      .getTasks(this.limit, this.offset)
      .pipe(take(1))
      .subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = this.tasks.concat(x?.data?.getTasks);
      });
  }
  loadData(event) {
    this.getTasks().finally(() => {
      event.target.complete();
    });
  }

  // async loadData(event) {
  //   this.offset = this.offset + 10;
  //   await this.taskService
  //     .getTasks(this.limit, this.offset)
  //     .toPromise()
  //     .then((x) => {
  //       this.tasks.concat(x?.data?.getTasks);
  //       if (event) {
  //         event.target.complete();
  //       }
  //     });
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
  // goToAddTask() {
  //   this.navCtrl.navigateForward('add-task');
  // }
}
