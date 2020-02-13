import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
const todos = [{
  id: 1,
  title: "吃饭",
  done: true
},
{
  id: 2,
  title: "睡觉",
  done: false
}]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public todos: {
    id: number;
    title: string;
    done: boolean;
  }[] = todos;

  public currentEditing: {
    id: number,
    title: string,
    done: boolean
  } = null;

  public visibility: string = 'all'

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      /* 路由事件类型：
        NavigationStart：导航开始
        NavigationEnd：导航结束
        NavigationCancel：取消导航
        NavigationError：导航出错
        RoutesRecoginzed：路由已认证
      */
      if (event instanceof NavigationEnd) {
        const hash = window.location.hash.substr(1);
        switch (hash) {
          case '/':
            this.visibility = 'all'
            break;
          case '/active':
            this.visibility = 'active'
            break;
          case '/completed':
            this.visibility = 'completed'
            break;
        }
      }
    })
  }

  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done)
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.done)
    }
  }

  addTodo(e): void {
    const titleText = e.target.value;

    const last = this.todos[this.todos.length - 1];

    this.todos.push({
      id: last ? last.id + 1 : 1,
      title: titleText,
      done: false
    });

    e.target.value = ""
  }

  get toggleAll() {
    return this.todos.every(item => item.done)
  }

  set toggleAll(val: boolean) {
    this.todos.forEach(item => item.done = val)
  }

  removeTodo(i: number): void {
    this.todos.splice(i, 1)
  }

  saveEdit(todo, e) {
    todo.title = e.target.value;
    this.currentEditing = null;
  }

  handleEditKeyUp(e) {
    const { keyCode, target } = e;
    if (keyCode == 27) {
      target.value = this.currentEditing.title;
      this.currentEditing = null
    }
  }

  get remaningCount() {
    return this.todos.filter(item => !item.done).length;
  }

  clearAllDone () {
    this.todos = this.todos.filter(t => !t.done)
  }
}
