import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Issue from '../Issue/Issue';
import TractionMissionControlContext from '../TractionMissionControlContext';
import './Issues.css';

class Issues extends Component {
    static contextType = TractionMissionControlContext;
    render() {
        const { issues } = this.context;
        return (
            <div className='issues'>
                <h2 className='issues-title'>Issues List</h2>
                {issues.map(issue => 
                    (issue.reviewed === 'no')
                        ? <Issue
                            key={issue.id}
                            id={issue.id}
                            issue={issue.issue}
                            who={issue.who}
                            created={issue.created}
                            status={issue.status}
                            status_date={issue.status_date}
                            reviewed={issue.reviewed}
                            buttons=''
                            show_status='hidden'
                        />
                        : null
                )}
                <Link to={'/AddIssue'}>
                    <button
                        className='add-issue-button'>
                            Add Issue
                    </button>
                </Link>
            </div>
        );
    };
};

export default Issues;