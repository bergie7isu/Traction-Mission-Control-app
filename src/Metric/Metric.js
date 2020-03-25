import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TractionMissionControlContext from '../TractionMissionControlContext';
import MetricResult from '../MetricResult/MetricResult';
import './Metric.css';
import moment from 'moment';
import config from '../config';

class Metric extends Component {
  static contextType = TractionMissionControlContext;

  handleSortUp() {
    const { metrics } = this.context;
    const moveUpId = this.props.id;
    const sortNumber = Number(metrics.find(metric => Number(metric.id) === Number(moveUpId)).sort);
    if (sortNumber !== 1) {
      const metricToMoveUp = {
        ...metrics.find(metric => Number(metric.id) === Number(moveUpId)),
        sort: sortNumber - 1
      };
      const moveDownId = metrics.find(metric => Number(metric.sort) === sortNumber - 1 && metric.status === 'active').id;
      const metricToMoveDown = {
        ...metrics.find(metric => Number(metric.id) === Number(moveDownId)),
        sort: sortNumber
      };
      const metricsToUpdate = [metricToMoveUp, metricToMoveDown];
      for (let i = 0; i < metricsToUpdate.length; i++) {
        fetch(config.API_ENDPOINT + `/api/metrics/${metricsToUpdate[i].id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(metricsToUpdate[i])
        })
        .then(res => {
          if (!res.ok)
            return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
          this.context.editMetric([metricsToUpdate[i]]);
        })
        .catch(error => {
          console.error({ error });
        });
      };
    };
  };

  handleSortDown() {
    const { metrics } = this.context;
    const moveDownId = this.props.id;
    const sortNumber = Number(metrics.find(metric => Number(metric.id) === Number(moveDownId)).sort);
    const highestSort = metrics.filter(metric => metric.status === 'active').length;
    if (sortNumber < highestSort) {
      const metricToMoveDown = {
        ...metrics.find(metric => Number(metric.id) === Number(moveDownId)),
        sort: sortNumber + 1
      };
      const moveUpId = metrics.find(metric => Number(metric.sort) === sortNumber + 1 && metric.status === 'active').id;
      const metricToMoveUp = {
        ...metrics.find(metric => Number(metric.id) === Number(moveUpId)),
        sort: sortNumber
      };
      const metricsToUpdate = [metricToMoveUp, metricToMoveDown];
      for (let i = 0; i < metricsToUpdate.length; i++) {
        fetch(config.API_ENDPOINT + `/api/metrics/${metricsToUpdate[i].id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(metricsToUpdate[i])
        })
        .then(res => {
          if (!res.ok)
            return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
          this.context.editMetric([metricsToUpdate[i]]);
        })
        .catch(error => {
          console.error({ error });
        });
      };
    };
  };

  handleResurrect() {
    const { metrics } = this.context;
    const metricId = this.props.id;
    const sortNumber = metrics.filter(metric => metric.status === 'active').length + 1;
    const metricToResurrect = [
      {
        ...metrics.find(metric => Number(metric.id) === Number(metricId)),
        status: "active",
        sort: sortNumber
      }
    ];
    fetch(config.API_ENDPOINT + `/api/metrics/${metricId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(metricToResurrect[0])
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => Promise.reject(error))
    })
    .then(() => {
      this.context.editMetric(metricToResurrect);
    })
    .catch(error => {
      console.error({ error });
    });
  };

  render() {
    return (
      <div className='metric'>
        <div className='metric-info'>
          <div className='metric-buttons'>
            <div className='sort-metric-buttons'>
              <button 
                className={`sort-metric-up ${this.props.sortButtons}`}
                onClick={() => this.handleSortUp()}>
                  <i className="arrow up"></i>
              </button>
              <button 
                className={`sort-metric-down ${this.props.sortButtons}`}
                onClick={() => this.handleSortDown()}>
                  <i className="arrow down"></i>
              </button>
            </div>
            <Link to={`/EditMetric/${this.props.id}`}>
              <button
                className={`metric-edit-button ${this.props.sortButtons}`}>
                  Edit/Plan
              </button>
            </Link>
            <div className={`archive-date ${this.props.archiveDate}`}>
              <div className='archive-date-heading'>
                Archived:
              </div>
              <div className='archive-date-date'>
                {moment(this.props.archived).format('M/D/YYYY')}
              </div>
              <button
                className='resurrect-metric-button'
                onClick={() => this.handleResurrect()}>
                  Resurrect
              </button>
            </div>
          </div>
          <div className='metric-info-wrapper'>
            <div className='metric-who'>
              {this.props.who}
            </div>
            <div className='metric-name'>
              {this.props.metric_name}
            </div>
          </div>
        </div>
        <div className='metric-results'>
          {this.props.dates_to_show.map(date =>
            <MetricResult 
              key={this.props.id + '-' + date}
              metricId={this.props.id}
              metric_type={this.props.metric_type}
              metric_format={this.props.metric_format}
              decimals={this.props.decimals}
              result={this.props.data.find(result => result.date === date) || 'none'}
              date={date}
              status={this.props.status}
            />
          )}
        </div>
      </div>
    );
  };
};

export default Metric;