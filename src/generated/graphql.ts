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
  createdDate?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  tasks?: Maybe<Array<CreateTaskDto>>;
  title?: Maybe<Scalars['String']>;
};

export type CreateTaskDto = {
  createdDate: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createTask: Task;
};


export type MutationCreateProjectArgs = {
  createProjectDto: CreateProjectDto;
};


export type MutationCreateTaskArgs = {
  createTaskDto: CreateTaskInput;
};

export type Project = {
  __typename?: 'Project';
  createdDate?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  tasks?: Maybe<Array<Task>>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allProjects: Array<Project>;
  allTasks: Array<Task>;
  allTasksLimit: Array<Task>;
  findOneProjectById: Project;
};


export type QueryAllTasksLimitArgs = {
  limit: Scalars['Int'];
};


export type QueryFindOneProjectByIdArgs = {
  id: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  createdDate?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  outcomes?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String'];
  createdDate: Scalars['String'];
  endDate: Scalars['String'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
  outcomes?: Maybe<Scalars['String']>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title?: string | null | undefined, details?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, outcomes?: string | null | undefined, isCompleted?: boolean | null | undefined, project?: { __typename?: 'Project', title?: string | null | undefined } | null | undefined } };

export type AllTasksLimitQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type AllTasksLimitQuery = { __typename?: 'Query', allTasksLimit: Array<{ __typename?: 'Task', id: string, title?: string | null | undefined, createdDate?: string | null | undefined, endDate?: string | null | undefined, isCompleted?: boolean | null | undefined, projectId?: number | null | undefined, outcomes?: string | null | undefined, details?: string | null | undefined, project?: { __typename?: 'Project', title?: string | null | undefined } | null | undefined }> };

export const CreateTaskDocument = gql`
    mutation createTask($title: String!, $createdDate: String!, $endDate: String!, $isCompleted: Boolean = false, $details: String, $outcomes: String) {
  createTask(
    createTaskDto: {title: $title, createdDate: $createdDate, endDate: $endDate, isCompleted: $isCompleted, details: $details, outcomes: $outcomes}
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