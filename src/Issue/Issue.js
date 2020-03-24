import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Issue.css';
import moment from 'moment';
import TractionMissionControlContext from '../TractionMissionControlContext';
import config from '../config';

class Issue extends Component {
  static contextType = TractionMissionControlContext;

  handleStatus(status, status_date) {
    const issueId = this.props.id;
    const updatedIssue = {...this.props, status: status, status_date: status_date};
    fetch(config.API_ENDPOINT + `/api/issues/${issueId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedIssue)
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => Promise.reject(error))
    })
    .then(() => {
      this.context.editIssue(updatedIssue);
    })
    .catch(error => {
      console.error({ error });
    });
  };

  render() {
    let status;
    if (this.props.status !== null) {
      status = this.props.status.toLowerCase().replace(' ', '-');
    } else {
      status = '';
    }
    return (
      <div className={`issue ${status}`}>
        <section className='issue-wrapper'>
          <section className='issue-content'>
            <section className='issue-issue-wrapper'>
              <section className='issue-issue'>
                {this.props.issue}
              </section>
              <section className='issue-who'>
                {this.props.who}
              </section>
            </section>
            <section className='issue-dates'>
              <section className='issue-created'>
                <b>Created:</b><br/>{moment(this.props.created).format('L')}
              </section>
            </section>
          </section>
          <section className={`issue-status ${this.props.show_status}`}>
            <section className='issue-status-status'>
              <b>Status:</b><br/>{this.props.status}
            </section>
            <section className='issue-status-date'>
              <b>Date:</b><br/>{moment(this.props.status_date).format('L')}
            </section>
          </section>  
          <section className={`issue-status-buttons ${this.props.buttons}`}>
            <button
              className={`issue-solved-button issue-button ${(status === 'solved')}`}
              onClick={() => this.handleStatus('Solved', moment(Date.now()).format('YYYY-MM-DD'))}>
                Solved
            </button>
            <button
              className={`issue-killed-button issue-button ${(status === 'killed')}`}
              onClick={() => this.handleStatus('Killed', moment(Date.now()).format('YYYY-MM-DD'))}>
                Killed
            </button>
            <button 
              className={`issue-combined-button issue-button ${(status === 'combined')}`}
              onClick={() => this.handleStatus('Combined', moment(Date.now()).format('YYYY-MM-DD'))}>
                Combined
            </button>
          </section>
        </section>
        <Link to={`/EditIssue/${this.props.id}`}>
          <button
            className={`issue-edit-button ${this.props.buttons}`}>
              Edit
          </button>
        </Link>
      </div>
    );
  };
};

export default Issue;