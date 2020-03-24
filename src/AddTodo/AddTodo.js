import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';
import config from '../config';
import './AddTodo.css';

class AddTodo extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            todo: {
                value: '',
                touched: false
            },
            who: {
                value: '',
                touched: false
            },
            due: {
                value: moment(Date.now()).add(7,'d').format('YYYY-MM-DD'),
                touched: false
            },
            issue: null,
            issueText: ''
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const newTodo = {
            todo: this.state.todo.value,
            who: this.state.who.value,
            created: moment(Date.now()).format('YYYY-MM-DD'),
            due: this.state.due.value,
            status: null,
            status_date: null,
            reviewed: 'no',
            issue: this.state.issue
        };
        fetch(config.API_ENDPOINT + `/api/todos`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)}
            return response.json()
        })
        .then((jsonNewTodo) => {
            this.context.addTodo(jsonNewTodo);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error });
        });
    };

    updateTodo(todo) {
        this.setState({
            todo: {
                value: todo,
                touched: true
            }
        });
    };

    updateWho(who) {
        this.setState({
            who: {
                value: who,
                touched: true
            }
        });
    };

    updateDue(due) {
        this.setState({
            due: {
                value: due,
                touched: true
            }
        });
    };

    updateIssue(issueText) {
        const { issues } = this.context;
        const whichIssue = issues.filter(issue => issue.issue === issueText);
        if (whichIssue.length !== 0) {
            const issue = whichIssue[0].id;
            this.setState({
                issue: issue,
                issueText: issueText
            });
        } else {
            this.setState({
                issue: null,
                issueText: ''
            });
        }
    };

    validateTodo() {
        const todo = this.state.todo.value.trim();
        if (todo === '') {
            return 'Enter a to-do!'
        }
    };

    validateWho() {
        const who = this.state.who.value.trim();
        if (who === '--Select an owner!--' || who === '') {
            return 'Someone needs to own it!'
        }
    };

    validateDue() {
        const due = this.state.due.value.trim();
        if (due === '') {
            return 'Commit to a due date!'
        }
    };

    render() {
        const { issues } = this.context;
        const { team } = this.context;
        const todoError = this.validateTodo();
        const whoError = this.validateWho();
        const dueError = this.validateDue();
        return (
            <div className='add-todo'>
                <h2 className='add-todo-title'>Add a To-do!</h2>
                <form
                    className='add-todo-form'
                    onSubmit={this.handleSubmit}>
                        <div className='add-todo-inputs'>
                            <div className='add-todo-todo'>
                                <label htmlFor='todo'>
                                    What's the to-do?
                                </label>
                                <textarea
                                    name='todo'
                                    id='todo'
                                    placeholder='Action!'
                                    onChange={e => this.updateTodo(e.target.value)}/>
                            </div>
                            {this.state.todo.touched && <ValidationError message={todoError} />}
                            <div className='add-todo-who'>
                                <label htmlFor='who'>
                                    Whose to-do is it?
                                </label>
                                <select
                                    type='text'
                                    name='who'
                                    id='who'
                                    onChange={e => this.updateWho(e.target.value)}>
                                        <option>--Select an owner!--</option>
                                        {team.map(name =>
                                            <option
                                                key={name}>
                                                    {name}
                                            </option>
                                        )}
                                </select>
                            </div>
                            {this.state.who.touched && <ValidationError message={whoError} />}
                            <div className='add-todo-due'>
                                <label htmlFor='due'>
                                    When is this to-do due?
                                </label>
                                <input
                                    type='date'
                                    name='due'
                                    id='due'
                                    value={this.state.due.value}
                                    onChange={e => this.updateDue(e.target.value)}
                                    />
                            </div>
                            {this.state.due.touched && <ValidationError message={dueError} />}
                            <div className='add-todo-issue'>
                                <label htmlFor='issue'>
                                    What issue is this to-do related to?
                                </label>
                                <select
                                    type='text'
                                    name='issue'
                                    id='issue'
                                    onChange={e => this.updateIssue(e.target.value)}>
                                        <option>--Select an issue!--</option>
                                        {issues.map(issue =>
                                            (issue.reviewed === 'no')
                                                ? <option
                                                key={issue.id}>
                                                    {issue.issue}
                                                </option>
                                                : null
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className='add-todo-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateTodo() ||
                                    this.validateWho() ||
                                    this.validateDue()}>
                                Add To-do!
                            </button>
                            <button
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                                    Cancel
                            </button>
                        </div>
                </form>
            </div>
        );
    };
};

export default AddTodo;