import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';
import './AddMetric.css';

class AddMetric extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            metric: {
                value: '',
                touched: false
            },
            who: {
                value: '',
                touched: false
            },
            type: {
                value: '',
                touched: false
            },
            format: {
                value: '',
                touched: false
            },
            decimals: {
                value: '',
                touched: false
            },
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const { metrics, currentWeek } = this.context;
        const numberOfActiveMetrics = metrics.filter(metric => metric.status === 'active').length;
        const thirteenWeeksOfData = [];
        for (let i = 0; i < 13; i++) {
            thirteenWeeksOfData.push({
                date: moment(currentWeek).add(i, 'weeks').format('YYYY-MM-DD'),
                plan: null,
                result: null
            });
        };
        const newMetric = {
            id: Math.ceil(Math.random() * 10000),
            sort: numberOfActiveMetrics + 1,
            status: 'active',
            who: this.state.who.value,
            metric_name: this.state.metric.value,
            metric_type: this.state.type.value,
            metric_format: this.state.format.value,
            decimals: this.state.decimals.value,
            created: moment(Date.now()).format('YYYY-MM-DD'),
            archived: "",
            data: thirteenWeeksOfData
        };
        this.context.addMetric(newMetric);
        this.props.history.goBack();
    };

    updateMetric(metric) {
        this.setState({
            metric: {
                value: metric,
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

    updateType(type) {
        this.setState({
            type: {
                value: type,
                touched: true
            }
        });
    };

    updateFormat(format) {
        this.setState({
            format: {
                value: format,
                touched: true
            }
        });
    };

    updateDecimals(decimals) {
        this.setState({
            decimals: {
                value: decimals,
                touched: true
            }
        });
    };

    validateMetric() {
        const metric = this.state.metric.value.trim();
        if (metric === '') {
            return 'Enter a metric!'
        };
    };

    validateWho() {
        const who = this.state.who.value.trim();
        if (who === '--Select an owner!--' || who === '') {
            return 'Someone needs to own it!'
        };
    };

    validateType() {
        const type = this.state.type.value.trim();
        if (type === '--Select a metric type!--' || type === '') {
            return 'Enter a metric type!'
        };
    };

    validateFormat() {
        const format = this.state.format.value.trim();
        if (format === '--Select a metric format!--' || format === '') {
            return 'Enter a metric format!'
        };
    };

    validateDecimals() {
        const decimals = this.state.decimals.value.trim();
        if (decimals < 0 || decimals > 5 || decimals === '') {
            return 'Pick a number of decimals between 0 and 5!'
        };
    };

    render() {
        const { team } = this.context;
        const metricError = this.validateMetric();
        const whoError = this.validateWho();
        const typeError = this.validateType();
        const formatError = this.validateFormat();
        const decimalsError = this.validateDecimals();
        return (
            <div className='add-metric'>
                <h2 className='add-metric-title'>Add a Metric!</h2>
                <form
                    className='add-metric-form'
                    onSubmit={this.handleSubmit}>
                        <div className='add-metric-inputs'>
                            <div className='add-metric-metric'>
                                <label htmlFor='metric'>
                                    What's the metric?
                                </label>
                                <textarea
                                    name='metric'
                                    id='metric'
                                    placeholder='Metric!'
                                    onChange={e => this.updateMetric(e.target.value)}/>
                            </div>
                            {this.state.metric.touched && <ValidationError message={metricError} />}
                            <div className='add-metric-who'>
                                <label htmlFor='who'>
                                    Whose metric is it?
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
                            <div className='add-metric-type'>
                                <label htmlFor='type'>
                                    What type of metric?
                                </label>
                                <select
                                    type='text'
                                    name='type'
                                    id='type'
                                    onChange={e => this.updateType(e.target.value)}>
                                        <option>--Select a metric type!--</option>
                                        <option value='>'>{'Greater Than (>)'}</option>
                                        <option value='<'>{'Less Than (<)'}</option>
                                </select>
                            </div>
                            {this.state.type.touched && <ValidationError message={typeError} />}
                            <div className='add-metric-format'>
                                <label htmlFor='format'>
                                    What's the metric format?
                                </label>
                                <select
                                    type='text'
                                    name='format'
                                    id='format'
                                    onChange={e => this.updateFormat(e.target.value)}>
                                        <option>--Select a metric format!--</option>
                                        <option value='number'>Number</option>
                                        <option value='dollars'>Dollars</option>
                                        <option value='percent'>Percentage</option>
                                </select>
                            </div>
                            {this.state.format.touched && <ValidationError message={formatError} />}
                            <div className='add-metric-decimals'>
                                <label htmlFor='decimals'>
                                    How many decimal places do you want to display?
                                </label>
                                <input
                                    type='number'
                                    name='decimals'
                                    id='decimals'
                                    placeholder='Decimals...'
                                    onChange={e => this.updateDecimals(e.target.value)} />
                            </div>
                            {this.state.decimals.touched && <ValidationError message={decimalsError} />}
                        </div>
                        <div className='add-metric-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateMetric() ||
                                    this.validateWho() ||
                                    this.validateType() ||
                                    this.validateFormat() ||
                                    this.validateDecimals()}>
                                Add Metric!
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

export default AddMetric;