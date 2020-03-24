import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import Issue from '../Issue/Issue';
import moment from 'moment';
import './FilteredIssues.css';

class FilteredIssues extends Component {
  static contextType = TractionMissionControlContext;

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      who: 'All',
      start_date: '',
      end_date: '',
      status: 'All',
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

  issueFilterText() {
    const { issues } = this.context;
    if (this.state.text === '') {
      return issues
    } else {
      return issues.filter(issue => issue.issue.toLowerCase().includes(this.state.text.toLowerCase()))
    }
  };

  issueFilterWho(issues) {
    if (this.state.who === 'All') {
      return issues
    } else {
      return issues.filter(issue => issue.who === this.state.who)
    }
  };

  issueFilterStartDate(issues) {
    if (this.state.start_date === '') {
      return issues
    } else {
      return issues.filter(issue => moment(issue.status_date).isSameOrAfter(moment(this.state.start_date)))
    }
  };

  issueFilterEndDate(issues) {
    if (this.state.end_date === '') {
      return issues
    } else {
      return issues.filter(issue => moment(issue.status_date).isSameOrBefore(moment(this.state.end_date)))
    }
  };

  issueFilterStatus(issues) {
    if (this.state.status === 'All') {
      return issues
    } else {
      return issues.filter(issue => issue.status === this.state.status)
    }
  };

  noIssues(filteredIssues) {
    if (filteredIssues.length === 0) {
      return <h3>No issues match your filter!</h3>
    }
  };

  render() {
    const { team } = this.context;
    const filteredIssues = this.issueFilterStatus(
      this.issueFilterEndDate(
        this.issueFilterStartDate(
          this.issueFilterWho(
            this.issueFilterText()))));
    return (
      <div className='filtered-issues'>
        <div className='issue-filters'>
          <h2 className='todo-filters-title'>Issue Filters</h2>
          <div className='filter-issue-text'>
            <label htmlFor='text'>
              Issue text:
            </label>
            <textarea
              name='text'
              id='text'
              value={this.state.text}
              onChange={e => this.updateFilterText(e.target.value)}>
            </textarea>
          </div>
          <div className='filter-issue-who'>
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
          <div className='filter-issue-start-date'>
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
          <div className='filter-issue-end-date'>
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
          <div className='filter-issue-status'>
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
                <option>Solved</option>
                <option>Killed</option>
                <option>Combined</option>
            </select>
          </div>
        </div>
          
        <div className='filtered-issues-list'>
          <h2 className='filtered-issues-title'>Filtered Issues</h2>
          {filteredIssues.map(issue => 
            (issue.reviewed === 'yes')
              ? <Issue
                key={issue.id}
                id={issue.id}
                issue={issue.issue}
                who={issue.who}
                created={issue.created}
                status={issue.status}
                status_date={issue.status_date}
                reviewed={issue.reviewed}
                buttons='hidden'
                show_status=''
              />
              : null
          )}
          {this.noIssues(filteredIssues)}
        </div>
      </div>
    );
  };
};

export default FilteredIssues;