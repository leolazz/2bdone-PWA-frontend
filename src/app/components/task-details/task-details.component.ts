import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonInput,
  IonSelect,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  AllProjectsTaskFormQuery,
  CreateTaskDto,
  Exact,
  GetTaskByIdQuery,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';
import { ToastController } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private id: string;
  private taskLoading: boolean = false;
  public task: GetTaskByIdQuery['findOneTaskById'];
  private subscriptions: Array<Subscription> = [];
  public myForm: FormGroup;
  public projects: AllProjectsTaskFormQuery['allProjects'];
  private projectsLoading: boolean = false;
  public updateSucessful: boolean = false;
  public queryRef: QueryRef<
    AllProjectsTaskFormQuery,
    Exact<{
      isCompleted?: boolean;
    }>
  >;
  @ViewChild('projectSelect', { static: false }) projectSelect: IonSelect;
  @ViewChild('titleInput', { static: false }) titleInput: IonInput;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    public toastController: ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [''],
      outcomes: [''],
      projectId: [],
      isCompleted: [false],
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe);
  }
  ionViewWillEnter() {
    this.queryRef.refetch();
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.taskService.getOneById(+this.id).subscribe((x) => {
        this.taskLoading = true;
        this.task = x?.data?.findOneTaskById;
        this.myForm.patchValue({ endDate: this.task.endDate });
        this.myForm.patchValue({ title: this.task.title });
      })
    );
    this.queryRef = this.projectService.getProjectsTaskForm();
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.projectsLoading = x.loading;
        this.projects = x?.data?.allProjects;
      })
    );
  }
  async deleteTaskAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Options',
      message: 'Are you sure you want to delete this Task?',
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Delete Task',
          handler: () => this.deleteTask(),
        },
      ],
    });

    await alert.present();
  }

  async deleteTask() {
    const deletedTask = await this.taskService.deleteTask(+this.id);
    if (deletedTask?.data?.deleteTask?.title) {
      this.Toast(`'${deletedTask?.data?.deleteTask?.title}' Deleted`, false);
      this.navCtrl.navigateBack('/tabs/tasks');
    } else this.Toast('Something Went Wrong', true);
  }

  async Toast(header: string, error: boolean) {
    let color;
    error ? (color = 'danger') : (color = 'secondary');
    const updateSucessful = await this.toastController.create({
      header,
      position: 'top',
      animated: true,
      duration: 4000,

      color: color,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
    await updateSucessful.present();
  }

  get taskTitle() {
    return this.myForm.get('title');
  }
  taskProject() {
    return this.myForm.get('projectId').value;
  }
  get taskEndDate() {
    return this.myForm.get('endDate');
  }
  async updateTask() {
    let updatedTask: CreateTaskDto;
    if (this.taskProject() === null) {
      updatedTask = {
        ...this.task,
        ...this.myForm.value,
        projectId: this.task.projectId,
      };
    } else {
      updatedTask = {
        ...this.task,
        ...this.myForm.value,
        projectId: this.taskProject(),
      };
    }
    const result = await this.taskService.updateTask({ ...updatedTask });
    if (result?.data?.updateTask) {
      this.Toast('Task Updated!', false);
      this.navCtrl.navigateBack('/tabs/tasks');
    } else this.Toast('Something Went Wrong', true);
  }
  formatDate(date: string) {
    const today = new Date(date);
    return today.toISOString();
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
}
