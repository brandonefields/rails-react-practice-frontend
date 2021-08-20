import { Component } from 'react';
import React from 'react'
import './App.css';
import TodoContainer from './components/TodoContainer';
import TodoForm from './components/TodoForm';
import { patchTodo, postTodo, deleteTodo } from './helpers';
import SignUpForm from './components/SignUpForm';

const todoURL = "http://localhost:3000/todos"

class App extends Component {

  state = {
    todos: [],
    user: {},
    alerts: []
  }

  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    fetch(todoURL)
      .then(response => response.json())
      .then(todos => this.setState({ todos }))
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
    postTodo(newTodo)
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    this.setState({ todos })
    patchTodo(updatedTodo)
  }

  deleteTodo = (id) => {
    let filteredTodos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filteredTodos
    })
    deleteTodo(id)
  }

  signUp = (user) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(res => {
      if(res.errors){
        this.setState({alerts: res.errors})
      }
      else {
        localStorage.setItem('token',res.token)
        this.setState({
          user: res.user,
          alerts: ["User successfully created!"]
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts}/>
        <TodoForm submitAction={this.addTodo} />
        <TodoContainer updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
