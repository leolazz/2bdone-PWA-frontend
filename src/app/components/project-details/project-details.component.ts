import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonSelect,
  NavController,
  ToastController,
} from '@ionic/angular';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  AllTasksProjectFormQuery,
  Exact,
  GetProjectByIdQuery,
  UpdateProjectDto,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  id: string;
  myForm: FormGroup;
  project: GetProjectByIdQuery['findOneProjectById'];
  private subscriptions: Array<Subscription> = [];
  public tasks: AllTasksProjectFormQuery['allOrphanTasks'];
  public queryRef: QueryRef<
    AllTasksProjectFormQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  private projectLoading: boolean = false;
  private tasksLoading: boolean = false;
  @ViewChild('tasksSelect', { static: false }) tasksSelect: IonSelect;
  @ViewChild('tasksToRemove', { static: false }) tasksToRemove: IonSelect;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    public toastController: ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [''],
      tasksId: [],
      tasksToRemoveId: [],
      isCompleted: [false],
    });
  }
  async Toast(header: string, error: boolean) {
    let color;
    error ? (color = 'danger') : (color = 'secondary');
    const toast = await this.toastController.create({
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
    await toast.present();
  }
  resetTasks() {
    this.tasksSelect.value = '';
  }
  resetTasksToRemove() {
    this.tasksToRemove.value = '';
  }
  get projectTitle() {
    return this.myForm.get('title');
  }
  get projectEndDate() {
    return this.myForm.get('endDate');
  }
  get projectTasksToRemove() {
    return this.myForm.get('tasksToRemoveId').value;
  }
  get projectTasks() {
    return this.myForm.get('tasksId').value;
  }

  async deleteProjectAlert() {
    let alert: HTMLIonAlertElement;
    if (this.project.tasks.length) {
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Delete Options',
        message: 'Are you sure you want to delete this Project?',
        buttons: [
          { text: 'Cancel' },
          { text: 'Delete Project Only', handler: () => this.deleteProject() },
          {
            text: 'Delete All Tasks & Project',
            handler: () => this.deleteProject(true),
          },
        ],
      });
    } else {
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Delete Project',
        message: 'Are you sure you want to delete this Project?',
        buttons: [
          { text: 'Cancel' },
          { text: 'Confirm', handler: () => this.deleteProject() },
        ],
      });
    }
    await alert.present();
  }

  async deleteProject(deleteTasks: boolean = false) {
    const deletedProject = await this.projectService.deleteProject({
      id: +this.id,
      deleteTasks: deleteTasks,
    });
    if (deletedProject?.data?.deleteProject) {
      this.Toast(
        `'${deletedProject?.data?.deleteProject?.title}' Deleted`,
        false
      );
      this.navCtrl.navigateBack('/tabs/projects');
    } else {
      this.Toast('Something Went Wrong', true);
    }
  }
  async updateProject() {
    const updatedProject: UpdateProjectDto = {
      ...this.project,
      ...this.myForm.value,
    };

    if (updatedProject.tasksId === null) updatedProject.tasksId = [];
    if (updatedProject.tasksToRemoveId === null)
      updatedProject.tasksToRemoveId = [];
    const result = await this.projectService.updateProject(updatedProject);
    if (result?.data?.updateProject) {
      this.Toast('Project Updated!', false);
      this.navCtrl.navigateBack('/tabs/projects');
    } else {
      this.Toast('Something Went Wrong.', true);
    }
  }
  todaysDate() {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }
  formatDate(date: string) {
    const endDate = new Date(date).toUTCString();
    return endDate.substring(0, 13);
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.projectService.getOneById(+this.id).subscribe((x) => {
        this.projectLoading = true;
        this.project = x?.data?.findOneProjectById;
        this.myForm.patchValue({ endDate: this.project?.endDate });
        this.myForm.patchValue({ title: this.project?.title });
        this.myForm.patchValue({ details: this.project?.details });
        this.myForm.patchValue({ isCompleted: this.project?.isCompleted });
      })
    );
    this.queryRef = this.taskService.getTasksProjectForm();
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.allOrphanTasks;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
