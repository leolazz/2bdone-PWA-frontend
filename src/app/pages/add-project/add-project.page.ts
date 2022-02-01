import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonSelect, ToastController, NavController } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  CreateProjectDto,
  AllTasksProjectFormQuery,
  Exact,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit {
  myForm: FormGroup;
  project: CreateProjectDto = {
    title: '',
    isCompleted: false,
    createdDate: this.todaysDate(),
    endDate: '',
    tasksId: [],
  };
  private subscriptions: Array<Subscription> = [];
  public tasks: AllTasksProjectFormQuery['allOrphanTasks'];
  public queryRef: QueryRef<
    AllTasksProjectFormQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  private tasksLoading: boolean = false;
  @ViewChild('tasksSelect', { static: false }) tasksSelect: IonSelect;
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
  resetTasks() {
    this.tasksSelect.value = '';
  }
  get projectTitle() {
    return this.myForm.get('title');
  }
  get projectEndDate() {
    return this.myForm.get('endDate');
  }
  get projectTasks() {
    return this.myForm.get('tasksId');
  }
  async saveProject() {
    const newProject: CreateProjectDto = {
      ...this.project,
      ...this.myForm.value,
    };
    if (newProject.tasksId == null) {
      newProject.tasksId = [];
    }
    const result = await this.projectService.createProject(newProject);
    if (result?.data?.createProject) {
      this.Toast('Project Added!', false);
      this.navCtrl.navigateBack('/tabs/projects');
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
  }
  ngOnInit() {
    this.queryRef = this.taskService.getTasksProjectForm();
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.allOrphanTasks;
      })
    );
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [],
      tasksId: [],
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
