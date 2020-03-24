import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import './EditTodo.css';

class EditTodo extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state={
            todo: {
                value: ''
            },
            who: {
                value: ''
            },
            created: '',
            due: {
               value: ''
            },
            status: '',
            status_date: '',
            reviewed: '',
            issue: null,
            issueText: ''
        };
    };

    componentDidMount() {
        const { todos, issues } = this.context;
        const todoId = this.props.match.params.id;
        const todo = todos.filter(todoToEdit => Number(todoToEdit.id) === Number(todoId));
        this.setState({
            todo: {
                value: todo[0].todo,
                touched: false
            },
            who: {
                value: todo[0].who,
                touched: false
            },
            created: todo[0].created,
            due: {
                value: todo[0].due,
                touched: false
            },
            status: todo[0].status,
            status_date: todo[0].status_date,
            reviewed: todo[0].reviewed,
            issue: todo[0].issue,
        });
        if (todo[0].issue !== null) {
            const issueId = todo[0].issue;
            const issue = issues.filter(issueFromId => issueFromId.id === issueId);
            this.setState({
                issueText: issue[0].issue,
            });
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const todoId = this.props.match.params.id;
        const updatedTodo = {
            id: todoId,
            todo: this.state.todo.value,
            who: this.state.who.value,
            created: this.state.created,
            due: this.state.due.value,
            status: this.state.status,
            status_date: this.state.status_date,
            reviewed: this.state.reviewed,
            issue: this.state.issue
        };
        fetch(config.API_ENDPOINT + `/api/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.context.editTodo(updatedTodo);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error });
        });
    };

    handleDelete = event => {
        event.preventDefault();
        const todoId = this.props.match.params.id;
        fetch(config.API_ENDPOINT + `/api/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)}
        })
        .then(() => {
            this.context.deleteTodo(todoId);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error })
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
            <div className='edit-todo'>
                <h2 className='edit-todo-title'>Edit a To-do!</h2>
                <form
                    className='edit-todo-form'
                    onSubmit={this.handleSubmit}>
                        <div className='edit-todo-inputs'>
                            <div className='edit-todo-todo'>
                                <label htmlFor='todo'>
                                    What's the to-do?
                                </label>
                                <textarea
                                    name='todo'
                                    id='todo'
                                    placeholder='Action!'
                                    value={this.state.todo.value}
                                    onChange={e => this.updateTodo(e.target.value)}/>
                            </div>
                            {this.state.todo.touched && <ValidationError message={todoError} />}
                            <div className='edit-todo-who'>
                                <label htmlFor='who'>
                                    Whose to-do is it?
                                </label>
                                <select
                                    type='text'
                                    name='who'
                                    id='who'
                                    value={this.state.who.value}
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
                            <div className='edit-todo-due'>
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
                            <div className='edit-todo-issue'>
                                <label htmlFor='issue'>
                                    What issue is this to-do related to?
                                </label>
                                <select
                                    type='text'
                                    name='issue'
                                    id='issue'
                                    value={this.state.issueText}
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
                        <div className='edit-todo-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateTodo() ||
                                    this.validateWho() ||
                                    this.validateDue()}>
                                Update To-do!
                            </button>
                            <button
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                                    Cancel
                            </button>
                            
                        </div>
                        <button
                            className='delete-todo-button'
                            type='button'
                            onClick={this.handleDelete}>
                                Delete<br/>To-do
                        </button>
                </form>
            </div>
        );
    };
};

export default EditTodo;