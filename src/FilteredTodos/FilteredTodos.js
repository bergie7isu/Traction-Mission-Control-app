import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import Todo from '../Todo/Todo';
import moment from 'moment';
import './FilteredTodos.css';

class FilteredTodos extends Component {
  static contextType = TractionMissionControlContext;

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      who: 'All',
      start_date: '',
      end_date: '',
      status: 'All'
    };
  };

  updateFilterText(text) {
    this.setState({
      text: text
    });
  };

  updateFilterWho(who) {
    this.setState({
      who: who
    });
  };

  updateFilterStartDate(date) {
    this.setState({
      start_date: date
    });
  };

  updateFilterEndDate(date) {
    this.setState({
      end_date: date
    });
  };

  updateFilterStatus(status) {
    this.setState({
      status: status
    });
  };

  todoFilterText() {
    const { todos } = this.context;
    if (this.state.text === '') {
      return todos
    } else {
      return todos.filter(todo => todo.todo.toLowerCase().includes(this.state.text.toLowerCase()))
    }
  };

  todoFilterWho(todos) {
    if (this.state.who === 'All') {
      return todos
    } else {
      return todos.filter(todo => todo.who === this.state.who)
    }
  };

  todoFilterStartDate(todos) {
    if (this.state.start_date === '') {
      return todos
    } else {
      return todos.filter(todo => moment(todo.status_date).isSameOrAfter(moment(this.state.start_date)))
    }
  };

  todoFilterEndDate(todos) {
    if (this.state.end_date === '') {
      return todos
    } else {
      return todos.filter(todo => moment(todo.status_date).isSameOrBefore(moment(this.state.end_date)))
    }
  };

  todoFilterStatus(todos) {
    if (this.state.status === 'All') {
      return todos
    } else {
      return todos.filter(todo => todo.status === this.state.status)
    }
  };

  noTodos(filteredTodos) {
    if (filteredTodos.length === 0) {
      return <h3>No todos match your filter!</h3>
    }
  };

  render() {
    const { team } = this.context;
    const filteredTodos = this.todoFilterStatus(
      this.todoFilterEndDate(
        this.todoFilterStartDate(
          this.todoFilterWho(
            this.todoFilterText()))));
    return (
      <div className='filtered-todos'>
        <div className='todo-filters'>
          <h2 className='todo-filters-title'>To-do Filters</h2>
          <div className='filter-todo-text'>
            <label htmlFor='text'>
              To-do text:
            </label>
            <textarea
              name='text'
              id='text'
              value={this.state.text}
              onChange={e => this.updateFilterText(e.target.value)}>
            </textarea>
          </div>
          <div className='filter-todo-who'>
            <label htmlFor='who'>
              Who:
            </label>
            <select
              type='text'
              name='who'
              id='who'
              value={this.state.who}
              onChange={e => this.updateFilterWho(e.target.value)}>
                <option>All</option>
                {team.map(name =>
                  <option
                    key={name}>
                      {name}
                  </option>
                )}
            </select>
          </div>
          <div className='filter-todo-start-date'>
            <label htmlFor='start-date'>
              Start status date:
            </label>
            <input
              type='date'
              name='start-date'
              id='start-date'
              value={this.state.start_date}
              onChange={e => this.updateFilterStartDate(e.target.value)}
            />
          </div>
          <div className='filter-todo-end-date'>
            <label htmlFor='end-date'>
              End status date:
            </label>
            <input
              type='date'
              name='end-date'
              id='end-date'
              value={this.state.end_date}
              onChange={e => this.updateFilterEndDate(e.target.value)}
            />
          </div>
          <div className='filter-todo-status'>
          <label htmlFor='status'>
              Status:
            </label>
            <select
              type='text'
              name='status'
              id='status'
              value={this.state.status}
              onChange={e => this.updateFilterStatus(e.target.value)}>
                <option>All</option>
                <option>Done</option>
                <option>Not Done</option>
            </select>
          </div>
        </div>
          
        <div className='filtered-todos-list'>
          <h2 className='filtered-todos-title'>Filtered To-dos</h2>
          {filteredTodos.map(todo => 
            (todo.reviewed === 'yes')
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
                buttons='hidden'
                show_status=''
              />
              : null
          )}
          {this.noTodos(filteredTodos)}
        </div>
      </div>
    );
  };
};

export default FilteredTodos;