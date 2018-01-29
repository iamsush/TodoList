import { Injectable } from '@angular/core';
import Todo from '../models/todo-model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000';
  todo_url = `${this.api_url}/api/todo`;

  constructor( private http : HttpClient ) { }

  createTodo( todo : Todo) : Observable <any>{
    let createUrl = `${this.todo_url}`;
    return this.http.post(createUrl, todo);
  };

  getTodos() : Observable <Todo []>{
    let getUrl = `${this.todo_url}`;
    return this.http.get(getUrl)
    .map(res => {
      return res["data"].docs  as Todo[];
    });
  }

  updateTodo(todo : Todo) : Observable<any>{
    let updateUrl = `${this.todo_url}`;
    return this.http.put(updateUrl, todo);
  };

  deleteTodo(id:string) : any {
    let deleteUrl = `${this.todo_url}/${id}`;
    return this.http.delete(deleteUrl)
    .map(res => {
      return res;
    });
  }

  private handleError(error : any) : Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
