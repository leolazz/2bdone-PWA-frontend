/* tslint:disable */
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateProjectDto = {
  createdDate: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  tasksId?: Maybe<Array<Maybe<Scalars['Int']>>>;
  title: Scalars['String'];
};

export type CreateTaskDto = {
  createdDate: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  isCompleted: Scalars['Boolean'];
  outcomes?: Maybe<Scalars['String']>;
  project?: Maybe<CreateProjectDto>;
  projectId?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type CreateTaskInput = {
  createdDate: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  outcomes?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type DeleteProjectInput = {
  deleteTasks: Scalars['Boolean'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createTask: Task;
  deleteProject: Project;
  deleteTask: Task;
  updateProject: Project;
  updateTask: Task;
};


export type MutationCreateProjectArgs = {
  createProjectDto: CreateProjectDto;
};


export type MutationCreateTaskArgs = {
  createTaskDto: CreateTaskInput;
};


export type MutationDeleteProjectArgs = {
  deleteProjectInput: DeleteProjectInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateProjectArgs = {
  updateProjectDto: UpdateProjectDto;
};


export type MutationUpdateTaskArgs = {
  createTaskDto: CreateTaskDto;
};

export type PageableOptions = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sortOptions?: Maybe<SortOptions>;
};

export type PaginatedProjectsResponse = {
  __typename?: 'PaginatedProjectsResponse';
  items: Array<Project>;
  total: Scalars['Int'];
};

export type PaginatedTasksResponse = {
  __typename?: 'PaginatedTasksResponse';
  items: Array<Task>;
  total: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  createdDate: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  id: Scalars['Int'];
  isCompleted: Scalars['Boolean'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allOrphanTasks: Array<Task>;
  allProjects: Array<Project>;
  allTasks: Array<Task>;
  allTasksLimit: Array<Task>;
  findOneProjectById: Project;
  findOneTaskById: Task;
  paginatedProjects: PaginatedProjectsResponse;
  paginatedTasks: PaginatedTasksResponse;
};


export type QueryAllProjectsArgs = {
  isCompleted: Scalars['Boolean'];
};


export type QueryAllTasksLimitArgs = {
  limit: Scalars['Int'];
};


export type QueryFindOneProjectByIdArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneTaskByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPaginatedProjectsArgs = {
  pageableOptions?: Maybe<PageableOptions>;
};


export type QueryPaginatedTasksArgs = {
  pageableOptions?: Maybe<PageableOptions>;
};

export type SortOptions = {
  ascending: Scalars['Boolean'];
  field: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  createdDate?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  outcomes?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateProjectDto = {
  createdDate: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  id: Scalars['Int'];
  isCompleted: Scalars['Boolean'];
  removeExistingTasks: Scalars['Boolean'];
  tasksId?: Maybe<Array<Maybe<Scalars['Int']>>>;
  title: Scalars['String'];
};

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  tasksId?: Maybe<Array<Maybe<Scalars['Int']>> | Maybe<Scalars['Int']>>;
  createdDate: Scalars['String'];
  endDate: Scalars['String'];
  isCompleted: Scalars['Boolean'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', title: string } };

export type DeleteProjectMutationVariables = Exact<{
  deleteTasks?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'Project', title: string } };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  createdDate: Scalars['String'];
  endDate: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  removeExistingTasks: Scalars['Boolean'];
  details?: Maybe<Scalars['String']>;
  tasksId?: Maybe<Array<Maybe<Scalars['Int']>> | Maybe<Scalars['Int']>>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: number, title: string, details?: string | null | undefined, createdDate: string, endDate: string, isCompleted: boolean, tasks?: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined } | null | undefined> | null | undefined } };

export type AllProjectsWithTasksQueryVariables = Exact<{
  isCompleted?: Maybe<Scalars['Boolean']>;
}>;


export type AllProjectsWithTasksQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, title: string, details?: string | null | undefined, isCompleted: boolean, createdDate: string, endDate: string, tasks?: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined, endDate?: string | null | undefined } | null | undefined> | null | undefined }> };

export type AllProjectsTaskFormQueryVariables = Exact<{
  isCompleted?: Maybe<Scalars['Boolean']>;
}>;


export type AllProjectsTaskFormQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, title: string, endDate: string }> };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', findOneProjectById: { __typename?: 'Project', id: number, title: string, details?: string | null | undefined, createdDate: string, endDate: string, isCompleted: boolean, tasks?: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined, endDate?: string | null | undefined } | null | undefined> | null | undefined } };

export type PaginatedProjectsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  field: Scalars['String'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  ascending: Scalars['Boolean'];
}>;


export type PaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjectsResponse', total: number, items: Array<{ __typename?: 'Project', id: number, title: string, createdDate: string, endDate: string, isCompleted: boolean, details?: string | null | undefined, tasks?: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined } | null | undefined> | null | undefined }> } };

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String'];
  createdDate: Scalars['String'];
  endDate: Scalars['String'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
  outcomes?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: number, title?: string | null | undefined, details?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, outcomes?: string | null | undefined, isCompleted?: boolean | null | undefined, project?: { __typename?: 'Project', title: string } | null | undefined } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', title?: string | null | undefined } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  createdDate: Scalars['String'];
  endDate: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  details?: Maybe<Scalars['String']>;
  outcomes?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: number, title?: string | null | undefined, details?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, outcomes?: string | null | undefined, isCompleted?: boolean | null | undefined, project?: { __typename?: 'Project', title: string } | null | undefined } };

export type GetTaskByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTaskByIdQuery = { __typename?: 'Query', findOneTaskById: { __typename?: 'Task', id: number, title?: string | null | undefined, details?: string | null | undefined, outcomes?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, projectId?: number | null | undefined, isCompleted?: boolean | null | undefined, project?: { __typename?: 'Project', title: string, endDate: string } | null | undefined } };

export type AllTasksLimitQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type AllTasksLimitQuery = { __typename?: 'Query', allTasksLimit: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, isCompleted?: boolean | null | undefined, projectId?: number | null | undefined, outcomes?: string | null | undefined, details?: string | null | undefined, project?: { __typename?: 'Project', title: string } | null | undefined }> };

export type AllTasksProjectFormQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTasksProjectFormQuery = { __typename?: 'Query', allOrphanTasks: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined, endDate?: string | null | undefined }> };

export type PaginatedTasksQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  field: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  ascending: Scalars['Boolean'];
}>;


export type PaginatedTasksQuery = { __typename?: 'Query', paginatedTasks: { __typename?: 'PaginatedTasksResponse', total: number, items: Array<{ __typename?: 'Task', id: number, title?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, isCompleted?: boolean | null | undefined, projectId?: number | null | undefined, outcomes?: string | null | undefined, details?: string | null | undefined, project?: { __typename?: 'Project', title: string } | null | undefined }> } };

export const CreateProjectDocument = gql`
    mutation createProject($title: String!, $details: String, $tasksId: [Int], $createdDate: String!, $endDate: String!, $isCompleted: Boolean!) {
  createProject(
    createProjectDto: {title: $title, tasksId: $tasksId, details: $details, createdDate: $createdDate, endDate: $endDate, isCompleted: $isCompleted}
  ) {
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProjectGQL extends Apollo.Mutation<CreateProjectMutation, CreateProjectMutationVariables> {
    document = CreateProjectDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteProjectDocument = gql`
    mutation deleteProject($deleteTasks: Boolean = false, $id: Int!) {
  deleteProject(deleteProjectInput: {deleteTasks: $deleteTasks, id: $id}) {
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProjectGQL extends Apollo.Mutation<DeleteProjectMutation, DeleteProjectMutationVariables> {
    document = DeleteProjectDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProjectDocument = gql`
    mutation updateProject($id: Int!, $title: String!, $createdDate: String!, $endDate: String!, $isCompleted: Boolean!, $removeExistingTasks: Boolean!, $details: String, $tasksId: [Int]) {
  updateProject(
    updateProjectDto: {id: $id, title: $title, createdDate: $createdDate, removeExistingTasks: $removeExistingTasks, endDate: $endDate, isCompleted: $isCompleted, tasksId: $tasksId, details: $details}
  ) {
    id
    title
    details
    createdDate
    endDate
    isCompleted
    tasks {
      id
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProjectGQL extends Apollo.Mutation<UpdateProjectMutation, UpdateProjectMutationVariables> {
    document = UpdateProjectDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllProjectsWithTasksDocument = gql`
    query allProjectsWithTasks($isCompleted: Boolean = false) {
  allProjects(isCompleted: $isCompleted) {
    id
    title
    details
    isCompleted
    createdDate
    endDate
    tasks {
      id
      title
      endDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllProjectsWithTasksGQL extends Apollo.Query<AllProjectsWithTasksQuery, AllProjectsWithTasksQueryVariables> {
    document = AllProjectsWithTasksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllProjectsTaskFormDocument = gql`
    query allProjectsTaskForm($isCompleted: Boolean = false) {
  allProjects(isCompleted: $isCompleted) {
    id
    title
    endDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllProjectsTaskFormGQL extends Apollo.Query<AllProjectsTaskFormQuery, AllProjectsTaskFormQueryVariables> {
    document = AllProjectsTaskFormDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProjectByIdDocument = gql`
    query getProjectById($id: Int!) {
  findOneProjectById(id: $id) {
    id
    title
    details
    createdDate
    endDate
    tasks {
      id
      title
      endDate
    }
    isCompleted
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProjectByIdGQL extends Apollo.Query<GetProjectByIdQuery, GetProjectByIdQueryVariables> {
    document = GetProjectByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PaginatedProjectsDocument = gql`
    query paginatedProjects($limit: Int!, $offset: Int!, $field: String!, $isCompleted: Boolean = false, $ascending: Boolean!) {
  paginatedProjects(
    pageableOptions: {limit: $limit, offset: $offset, isCompleted: $isCompleted, sortOptions: {field: $field, ascending: $ascending}}
  ) {
    items {
      id
      title
      createdDate
      endDate
      isCompleted
      tasks {
        id
        title
      }
      details
    }
    total
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PaginatedProjectsGQL extends Apollo.Query<PaginatedProjectsQuery, PaginatedProjectsQueryVariables> {
    document = PaginatedProjectsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTaskDocument = gql`
    mutation createTask($title: String!, $createdDate: String!, $endDate: String!, $isCompleted: Boolean = false, $details: String, $outcomes: String, $projectId: Int) {
  createTask(
    createTaskDto: {title: $title, createdDate: $createdDate, endDate: $endDate, isCompleted: $isCompleted, details: $details, outcomes: $outcomes, projectId: $projectId}
  ) {
    id
    title
    details
    createdDate
    endDate
    outcomes
    isCompleted
    project {
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTaskGQL extends Apollo.Mutation<CreateTaskMutation, CreateTaskMutationVariables> {
    document = CreateTaskDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTaskDocument = gql`
    mutation deleteTask($id: Float!) {
  deleteTask(id: $id) {
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTaskGQL extends Apollo.Mutation<DeleteTaskMutation, DeleteTaskMutationVariables> {
    document = DeleteTaskDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTaskDocument = gql`
    mutation updateTask($id: Int!, $title: String!, $createdDate: String!, $endDate: String!, $isCompleted: Boolean!, $details: String, $outcomes: String, $projectId: Int) {
  updateTask(
    createTaskDto: {id: $id, title: $title, createdDate: $createdDate, endDate: $endDate, isCompleted: $isCompleted, projectId: $projectId, details: $details, outcomes: $outcomes}
  ) {
    id
    title
    details
    createdDate
    endDate
    outcomes
    isCompleted
    project {
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTaskGQL extends Apollo.Mutation<UpdateTaskMutation, UpdateTaskMutationVariables> {
    document = UpdateTaskDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTaskByIdDocument = gql`
    query getTaskById($id: Int!) {
  findOneTaskById(id: $id) {
    id
    title
    details
    outcomes
    createdDate
    endDate
    projectId
    isCompleted
    project {
      title
      endDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTaskByIdGQL extends Apollo.Query<GetTaskByIdQuery, GetTaskByIdQueryVariables> {
    document = GetTaskByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllTasksLimitDocument = gql`
    query allTasksLimit($limit: Int!) {
  allTasksLimit(limit: $limit) {
    id
    title
    createdDate
    endDate
    isCompleted
    projectId
    outcomes
    details
    project {
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllTasksLimitGQL extends Apollo.Query<AllTasksLimitQuery, AllTasksLimitQueryVariables> {
    document = AllTasksLimitDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllTasksProjectFormDocument = gql`
    query allTasksProjectForm {
  allOrphanTasks {
    id
    title
    endDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllTasksProjectFormGQL extends Apollo.Query<AllTasksProjectFormQuery, AllTasksProjectFormQueryVariables> {
    document = AllTasksProjectFormDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PaginatedTasksDocument = gql`
    query paginatedTasks($limit: Int!, $offset: Int!, $field: String!, $isCompleted: Boolean!, $ascending: Boolean!) {
  paginatedTasks(
    pageableOptions: {limit: $limit, offset: $offset, isCompleted: $isCompleted, sortOptions: {field: $field, ascending: $ascending}}
  ) {
    items {
      id
      title
      createdDate
      endDate
      isCompleted
      projectId
      outcomes
      details
      project {
        title
      }
    }
    total
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PaginatedTasksGQL extends Apollo.Query<PaginatedTasksQuery, PaginatedTasksQueryVariables> {
    document = PaginatedTasksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }