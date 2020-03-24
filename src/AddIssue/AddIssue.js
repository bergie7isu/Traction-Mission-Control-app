import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';
import config from '../config';
import './AddIssue.css';

class AddIssue extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            issue: {
                value: '',
                touched: false
            },
            who: {
                value: '',
                touched: false
            }
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const newIssue = {
            issue: this.state.issue.value,
            who: this.state.who.value,
            created: moment(Date.now()).format('YYYY-MM-DD'),
            status: null,
            status_date: null,
            reviewed: 'no'
        };
        fetch(config.API_ENDPOINT + `/api/issues`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newIssue)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)}
            return response.json()
        })
        .then((jsonNewIssue) => {
            this.context.addIssue(jsonNewIssue);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error });
        });
    };

    updateIssue(issue) {
        this.setState({
            issue: {
                value: issue,
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

    validateIssue() {
        const issue = this.state.issue.value.trim();
        if (issue === '') {
            return 'Enter an issue!'
        }
    };

    validateWho() {
        const who = this.state.who.value.trim();
        if (who === '--Select an owner!--' || who === '') {
            return 'Someone needs to own it!'
        }
    };

    render() {
        const { team } = this.context;
        const issueError = this.validateIssue();
        const whoError = this.validateWho();
        return (
            <div className='add-issue'>
                <h2 className='add-issue-title'>Add an Issue!</h2>
                <form
                    className='add-issue-form'
                    onSubmit={this.handleSubmit}>
                        <div className='add-issue-inputs'>
                            <div className='add-issue-issue'>
                                <label htmlFor='issue'>
                                    What's the issue?
                                </label>
                                <textarea
                                    name='issue'
                                    id='issue'
                                    placeholder='Problem, idea, communication...'
                                    onChange={e => this.updateIssue(e.target.value)}/>
                            </div>
                            {this.state.issue.touched && <ValidationError message={issueError} />}
                            <div className='add-issue-who'>
                                <label htmlFor='who'>
                                    Whose issue is it?
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
                        </div>
                        <div className='add-issue-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateIssue() ||
                                    this.validateWho()}>
                                Add Issue!
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

export default AddIssue;