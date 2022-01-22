import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSelect, ToastController, NavController } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  CreateTaskInput,
  AllProjectsTaskFormQuery,
  Exact,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  myForm: FormGroup;
  task: CreateTaskInput = {
    title: '',
    endDate: '',
    isCompleted: false,
    createdDate: this.todaysDate(),
  };
  public queryRef: QueryRef<
    AllProjectsTaskFormQuery,
    Exact<{
      isCompleted?: boolean;
    }>
  >;
  private subscriptions: Array<Subscription> = [];
  public projects: AllProjectsTaskFormQuery['allProjects'];
  private projectsLoading: boolean = false;
  @ViewChild('projectSelect', { static: false }) projectSelect: IonSelect;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    public toastController: ToastController,
    public navCtrl: NavController
  ) {}

  async Toast(header: string, error: boolean) {
    let color;
    error ? (color = 'danger') : (color = 'secondary');
    const created = await this.toastController.create({
      header,
      position: 'top',
      animated: true,
      duration: 4000,

      color,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
    await created.present();
  }

  resetProject() {
    this.projectSelect.value = '';
  }

  get taskTitle() {
    return this.myForm.get('title');
  }
  get taskEndDate() {
    return this.myForm.get('endDate');
  }
  async saveTask() {
    let newTask: CreateTaskInput = { ...this.task, ...this.myForm.value };
    newTask.endDate = newTask.endDate.substring(0, 10);
    const result = await this.taskService.createTask(newTask);
    if (result?.data?.createTask) {
      this.Toast('Task Added!', false);
      this.navCtrl.navigateBack('/tabs/tasks');
    } else this.Toast('Something Went Wrong', true);
  }
  todaysDate() {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }
  maxDate() {
    return new Date(new Date().setFullYear(new Date().getFullYear() + 5))
      .toISOString()
      .substring(0, 4);
  }
  ionViewWillEnter() {
    this.queryRef.refetch();
    console.log('refresh');
  }
  ngOnInit() {
    this.queryRef = this.projectService.getProjectsTaskForm();
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.projectsLoading = x.loading;
        this.projects = x?.data?.allProjects;
      })
    );

    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [],
      outcomes: [],
      projectId: [],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
