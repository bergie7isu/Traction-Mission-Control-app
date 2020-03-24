import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import ActiveMetrics from '../ActiveMetrics/ActiveMetrics';
import ArchivedMetrics from '../ArchivedMetrics/ArchivedMetrics';
import TractionMissionControlContext from '../TractionMissionControlContext';
import './Scorecard.css';
import moment from 'moment';

class Scorecard extends Component {
  static contextType = TractionMissionControlContext;

  constructor(props) {
    super(props);
    this.state={
      startDate: '',
      endDate: '',
    };
  };

  componentDidMount() {
    const { currentWeek } = this.context;
    this.setState({
      startDate: moment(currentWeek).subtract(12, 'weeks').format('YYYY-MM-DD'),
      endDate: moment(currentWeek).format('YYYY-MM-DD'),
    });
  };

  updateScorecardStartDate(date) {
    const { endOfWeek } = this.context;
    const { endDate } = this.state;
    if (date === '' || date > endDate) {
      return;
    };
    if (moment(date).day() === Number(endOfWeek)) {
      this.setState({
        startDate: moment(date).format('YYYY-MM-DD')
      });
      if (moment(endDate).diff(date, 'week') < 12) {
        this.updateScorecardEndDate(moment(date).add(12, 'weeks').format('YYYY-MM-DD'));
      };
    } else {
      this.setState({
        startDate: moment(date).add(6 - moment(date).day(), 'days').format('YYYY-MM-DD')
      });
      if (moment(endDate).diff(moment(date).add(6 - moment(date).day(), 'days').format('YYYY-MM-DD'), 'week') < 12) {
        this.updateScorecardEndDate(moment(moment(date).add(6 - moment(date).day(), 'days').format('YYYY-MM-DD')).add(12, 'weeks').format('YYYY-MM-DD'));
      };
    };
  };
  
  updateScorecardEndDate(date) {
    const { endOfWeek } = this.context;
    const { startDate } = this.state
    if (date === '' || date < startDate) {
      return;
    };
    if (moment(date).day() === Number(endOfWeek)) {
      this.setState({
        endDate: moment(date).format('YYYY-MM-DD')
      });
      if (moment(date).diff(startDate, 'week') < 12) {
        this.updateScorecardStartDate(moment(date).subtract(12, 'weeks').format('YYYY-MM-DD'));
      };
    } else {
      this.setState({
        endDate: moment(date).add(6 - moment(date).day(), 'days').format('YYYY-MM-DD')
      });
      if (moment(date).add(6 - moment(date).day()).diff(startDate, 'week') < 12) {
        this.updateScorecardStartDate(moment(date).add(6 - moment(date).day(), 'days').subtract(12, 'weeks').format('YYYY-MM-DD'));
      };
    };
  };

  handleReset() {
    const { currentWeek } = this.context;
    this.setState({
      startDate: moment(currentWeek).subtract(12, 'weeks').format('YYYY-MM-DD'),
      endDate: moment(currentWeek).format('YYYY-MM-DD')
    });
  };

  render() {
    const { endOfWeek } = this.context;
    const dates = [this.state.startDate];
    let date = moment(this.state.startDate).add(1, 'week').format('YYYY-MM-DD');
    while (date <= this.state.endDate) {
      dates.push(date);
      date = moment(date).add(1, 'week').format('YYYY-MM-DD');
    };
    return (
      <div className='scorecard'>
        <Nav />
        <h1 className='route-heading'>Scorecard</h1>
        <div className='scorecard-date-range'>
          <div className='scorecard-date-wrapper'>
            <div className='scorecard-start-date'>
              <label htmlFor='scorecard-start-date'>
                Start Date:
              </label>
              <input
                type='date'
                name='scorecard-start-date'
                id='scorecard-start-date'
                value={this.state.startDate}
                onKeyDown={e => e.preventDefault()}
                onChange={e => this.updateScorecardStartDate(e.target.value)}
              />
            </div>
            <div className='scorecard-end-date'>
              <label htmlFor='scorecard-end-date'>
                End Date:
              </label>
              <input
                type='date'
                name='scorecard-end-date'
                id='scorecard-end-date'
                value={this.state.endDate}
                onKeyDown={e => e.preventDefault()}
                onChange={e => this.updateScorecardEndDate(e.target.value)}
              />
            </div>
            <button
              className='reset-scorecard-dates'
              onClick={() => this.handleReset()}>
                Reset Dates
            </button>
          </div>
          <div className='scorecard-date-explanation'>
            (weeks end on {moment().day(endOfWeek).format('dddd')})
          </div>  
        </div>
        <ActiveMetrics 
          dates_to_show={dates}
        />
        <h1 className='route-heading-sub'>Archived Metrics</h1>
        <ArchivedMetrics 
          dates_to_show={dates}
        />
      </div>
    );
  };
};

export default Scorecard;