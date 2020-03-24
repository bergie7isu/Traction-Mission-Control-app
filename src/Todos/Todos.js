import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Todo from '../Todo/Todo';
import TractionMissionControlContext from '../TractionMissionControlContext';
import './Todos.css';

class Todos extends Component {
  static contextType = TractionMissionControlContext;
  render() {
    const { todos } = this.context;
    return (
      <div className='todos'>
        <h2 className='todos-title'>To-do List</h2>
        {todos.map(todo => 
          (todo.reviewed === 'no')
            ? <Todo
              key={todo.id}
              id={todo.id}
              todo={todo.todo}
              who={todo.who}
              created={todo.created}
              due={todo.due}
              status={todo.status}
              status_date={todo.status_date}
              reviewed={todo.reviewed}
              issue={todo.issue}
              buttons=''
              show_status='hidden'
            />
            : null
        )}
        <Link to={'/AddTodo'}>
          <button
            className='add-todo-button'>
              Add To-do
          </button>
        </Link>
      </div>
    );
  };
};

export default Todos;