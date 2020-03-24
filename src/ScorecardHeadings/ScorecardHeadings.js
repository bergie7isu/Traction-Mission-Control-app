import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import './ScorecardHeadings.css';
import moment from 'moment';
import config from '../config';

class ScorecardHeadings extends Component {
  static contextType = TractionMissionControlContext;

  moveCurrentWeekLeft() {
    const { currentWeek } = this.context;
    const minDate = this.props.dates_to_show[0];
    const lastWeek = moment(currentWeek).subtract(1, 'week').format('YYYY-MM-DD');
    if (lastWeek >= minDate) {
      const weekId = 1;
      const updatedWeek = {
        current_week: lastWeek
      };
      fetch(config.API_ENDPOINT + `/api/weeks/${weekId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedWeek)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.moveCurrentWeek(lastWeek);
      })
      .catch(error => {
          console.error({ error });
      });
    };
  };

  moveCurrentWeekRight() {
    const { currentWeek } = this.context;
    const maxDate = this.props.dates_to_show[this.props.dates_to_show.length - 1];
    const nextWeek = moment(currentWeek).add(1, 'week').format('YYYY-MM-DD');
    if (nextWeek <= maxDate) {
      const weekId = 1;
      const updatedWeek = {
        current_week: nextWeek
      };
      fetch(config.API_ENDPOINT + `/api/weeks/${weekId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedWeek)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.moveCurrentWeek(nextWeek);
      })
      .catch(error => {
          console.error({ error });
      });
    };
  };

  render() {
    const { currentWeek } = this.context;
    return (
      <div className='scorecard-headings'>
        <div className='metric-info-headings'>
          <div className='metric-buttons-heading'></div>
          <div className='metric-info-headings-wrapper'>
            <div className='metric-who-heading'>
              Who
            </div>
            <div className='metric-name-heading'>
              Measurable
            </div>
          </div>
          <div className={`metric-info-headings-blocker ${this.props.type}`}></div>
        </div>
        <div className='metric-results-headings'>
          {this.props.dates_to_show.map(date => {
            return (
              <div 
                className={`metric-results-date ${(date === currentWeek) ? 'current-week' : ''} ${this.props.type}`}
                key={date}>
                  <div className='metric-results-date-heading'>
                    {moment(date).format('M/D/YYYY')}
                  </div>
                  <div className={`metric-results-date-current-week-wrapper ${this.props.type}`}>
                    <button
                      className='move-current-week-left-button'
                      type='button'
                      onClick={() => this.moveCurrentWeekLeft()}>
                        {'<='}
                    </button>
                    <div className='metric-results-date-current-week'>
                      {(date === currentWeek) ? 'current week': ''}
                    </div>
                    <button
                      className='move-current-week-right-button'
                      type='button'
                      onClick={() => this.moveCurrentWeekRight()}>
                        {'=>'}
                    </button>
                  </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  };
};

export default ScorecardHeadings;