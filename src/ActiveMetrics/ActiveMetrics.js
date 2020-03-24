import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Metric from '../Metric/Metric';
import ScorecardHeadings from '../ScorecardHeadings/ScorecardHeadings';
import TractionMissionControlContext from '../TractionMissionControlContext';
import './ActiveMetrics.css';

class ActiveMetrics extends Component {
  static contextType = TractionMissionControlContext;

  render() {
    const { metrics } = this.context;
    const metricsToDisplay = metrics.filter(metric => metric.status === 'active').sort((a, b) => a.sort - b.sort);
    const numberOfActiveMetrics = metricsToDisplay.length;
    return (
      <div className='active-metrics-wrapper'>
        <div className='active-metrics'>
          <ScorecardHeadings 
            dates_to_show={this.props.dates_to_show}
            type='active'
          />
          {metricsToDisplay.map(metric => 
            <Metric
              key={metric.id}
              id={metric.id}
              status={metric.status}
              who={metric.who}
              metric_name={metric.metric_name}
              metric_type={metric.metric_type}
              metric_format={metric.metric_format}
              decimals={metric.decimals}
              data={metric.data}
              dates_to_show={this.props.dates_to_show}
              sortButtons=''
              archiveDate='hidden'
            />
          )}
        </div>
        <Link to={'/AddMetric'}>
          <button
            className='add-metric-button'
            disabled={Boolean(numberOfActiveMetrics >= 15)}>
              {(numberOfActiveMetrics >= 15) ? '15 Metric Maximum Reached!' : 'Add Metric'}
          </button>
        </Link>
      </div>
    );
  };
};

export default ActiveMetrics;