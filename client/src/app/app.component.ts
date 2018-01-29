import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import Todo from './models/todo-model';
import { Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private todoService : TodoService){};

  newTodo: Todo = new Todo()

  todosList: Todo[];
  editTodos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todosList = todos
        console.log(todos)
      })
  }


  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res.data)
        this.newTodo = new Todo()
      })
  }

  updateTodo(todo: Todo) {
    console.log(todo)
    if(this.todosList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo)
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)
        this.todoService.updateTodo(todo).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.updateTodo(todo)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  doneTodo(todo:Todo){
    todo.status = 'Done'
    this.todoService.updateTodo(todo).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.updateTodo(todo)
      console.error('Update Unsuccesful')
    })
  }

  submitTodo(event, todo:Todo){
    if(event.keyCode ==13){
      this.updateTodo(todo)
    }
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
  }


  title = 'app';

}
