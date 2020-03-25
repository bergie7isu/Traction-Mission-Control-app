import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import './MetricResult.css';
import config from '../config';

class MetricResult extends Component {
  static contextType = TractionMissionControlContext;

  constructor(props) {
    super(props);
    this.state={
      result: this.props.result.result,
    };
  };

  componentDidMount() {
    const { currentWeek } = this.context;
    const showInput = (this.props.result !== 'none' && 
      this.props.status === 'active' && 
      this.props.date === currentWeek && 
      !this.props.result.result);
    const showEdit = (this.props.date === currentWeek &&
      this.props.result.result &&
      this.props.status === 'active');
    this.setState({
      showInput: showInput,
      showEdit: showEdit
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.result || this.state.result === 0) {
      const { metrics } = this.context;
      const metricId = this.props.metricId;
      const metricToUpdate = metrics.find(metric => Number(metric.id) === Number(metricId));
      const metricData = metricToUpdate.data.map(result => 
        (result.date === this.props.date) ? {...result, result: this.state.result} : result);
      const updatedMetric = [
        {
          ...metricToUpdate, 
          data: metricData
        }
      ];

      fetch(config.API_ENDPOINT + `/api/metrics/${metricId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedMetric[0])
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.setState({
          showInput: false,
          showEdit: true
        });
        this.context.editMetric(updatedMetric);
      })
      .catch(error => {
        console.error({ error });
      });
    };
  };

  updateResult(result) {
    this.setState({
      result: Number(result)
    });
  };

  handleEditClick() {
    this.setState({
      showInput: true,
      showEdit: false
    });
  };

  render() {
    const colorCode = (this.props.result === 'none') ? 'gray' :
      (this.props.result.result === null || !this.props.result.plan) ? '' : 
      (this.props.metric_type === '>' && this.props.result.result >= this.props.result.plan) ? 'green' : 
      (this.props.metric_type === '<' && this.props.result.result <= this.props.result.plan) ? 'green' :'red';
    const decimals = (Number(this.props.decimals) === 0) ? '1' :
      (Number(this.props.decimals) === 1) ? '0.1' :
      (Number(this.props.decimals) === 2) ? '0.01' :
      (Number(this.props.decimals) === 3) ? '0.001' :
      (Number(this.props.decimals) === 4) ? '0.0001' : '0.00001';
    const { currentWeek } = this.context;
    const showInput = (this.props.result !== 'none' && 
      this.props.status === 'active' && 
      this.props.date === currentWeek && 
      (!this.props.result.result || this.state.showInput));
    const showEdit = (this.props.date === currentWeek &&
      !showInput &&
      this.props.result.plan &&
      this.props.status === 'active');
    return (
      <div className='metric-result'>
        <div className={`metric-actual ${colorCode}`}>
          {(showInput || (this.props.date === currentWeek && this.state.showInput)) ? 
          <div className='metric-actual-input'>
            <form
              className='metric-actual-input-form'
              onSubmit={this.handleSubmit}>
                <input
                  type='number'
                  step={decimals}
                  name='metric-actual-input'
                  id='metric-actual-input'
                  value={this.state.result || ''}
                  placeholder='Enter Result!'
                  onChange={e => this.updateResult(e.target.value)}/>
                <button
                  className='metric-actual-input-submit-button'
                  type='submit'>
                    Submit
                </button>
            </form>
          </div> : 
          (this.props.result.result) ?
              (this.props.metric_format === 'dollars' ? '$' : '') + 
                this.props.result.result.toFixed(this.props.decimals) + 
                  (this.props.metric_format === 'percent' ? '%' : '') : 
              ''}
          {(showEdit || (this.props.date === currentWeek && this.state.showEdit)) ?
            <button
              className='edit-result-button'
              type='button'
              onClick={() => this.handleEditClick()}>
                Edit
            </button> : 
            ''}
        </div>
        <div className='metric-plan'>
          <div className='metric-type'>
            {(this.props.result.plan) ? this.props.metric_type : 'No Goal Set'}
          </div>
          <div className='metric-goal'>
            {(this.props.result.plan) ?
              (this.props.metric_format === 'dollars' ? '$' : '') + 
                this.props.result.plan.toFixed(this.props.decimals) + 
                  (this.props.metric_format === 'percent' ? '%' : '') : ''}
          </div>
        </div>
      </div>
    );
  };
};

export default MetricResult;