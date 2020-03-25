import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import './EditMetric.css';
import moment from 'moment';
import config from '../config';

class EditMetric extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            metric: {
                value: '',
            },
            who: {
                value: '',
            },
            type: {
                value: '',
            },
            format: {
                value: '',
            },
            decimals: {
                value: '',
            },
            metricData: [],
            planStartDate: '',
            planEndDate: '',
            earliestPlan: '',
            latestPlan: '',
            startDateError: false,
            endDateError: false
        };
    };

    componentDidMount() {
        const { metrics } = this.context;
        const metricId = this.props.match.params.id;
        const metricToEdit = metrics.filter(metric => Number(metric.id) === Number(metricId));
        const planStartDate = metricToEdit[0].data[0].date;
        const planEndDate = metricToEdit[0].data[metricToEdit[0].data.length - 1].date;
        this.setState({
            metric: {
                value: metricToEdit[0].metric_name,
                touched: false
            },
            who: {
                value: metricToEdit[0].who,
                touched: false
            },
            type: {
                value: metricToEdit[0].metric_type,
                touched: false
            },
            format: {
                value: metricToEdit[0].metric_format,
                touched: false
            },
            decimals: {
                value: metricToEdit[0].decimals,
                touched: false
            },
            metricData: metricToEdit[0].data,
            planStartDate: planStartDate,
            planEndDate: planEndDate,
            earliestPlan: planStartDate,
            latestPlan: planEndDate
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { metrics } = this.context;
        const metricId = this.props.match.params.id;
        const metricToUpdate = metrics.filter(metric => Number(metric.id) === Number(metricId));
        const updatedMetric = [
            {
                ...metricToUpdate[0], 
                who: this.state.who.value,
                metric_name: this.state.metric.value,
                metric_type: this.state.type.value,
                metric_format: this.state.format.value,
                decimals: this.state.decimals.value,
                data: this.state.metricData
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
            this.context.editMetric(updatedMetric);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error });
        });
    };

    handleArchive() {
        const { metrics } = this.context;
        const metricId = this.props.match.params.id;
        const metricsToArchive = [
            {
                ...metrics.find(metric => Number(metric.id) === Number(metricId)),
                status: "archived",
                archived: moment(Date.now()).format('YYYY-MM-DD')
            }
        ];
        const sortNumber = Number(metricsToArchive[0].sort);
        const activeMetrics = metrics.filter(metric => metric.status === 'active');
        for (let i = 0; i < activeMetrics.length; i++) {
            if (Number(activeMetrics[i].sort) > sortNumber) {
                metricsToArchive.push({...activeMetrics[i], sort: Number(activeMetrics[i].sort) - 1});
            };
        };
        for (let i = 0; i < metricsToArchive.length; i++) {
            fetch(config.API_ENDPOINT + `/api/metrics/${metricsToArchive[i].id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(metricsToArchive[i])
            })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                this.context.editMetric([metricsToArchive[i]]);
            })
            .catch(error => {
                console.error({ error });
            });
        };
        this.props.history.goBack();
    };

    updatePlanStartDate(date) {
        const { endOfWeek } = this.context;
        if (date === '') {
            this.setState({
                startDateError: false
            });
            return;
        };
        if (date > this.state.earliestPlan) {
            this.setState({
                startDateError: true
            });
            return;
        }
        const nextDate = (moment(date).day() === Number(endOfWeek)) ? 
            moment(date).format('YYYY-MM-DD') :
            moment(date).add(6 - moment(date).day(), 'days').format('YYYY-MM-DD');
        const weeks = moment(this.state.planStartDate).diff(nextDate, 'week');
        if (weeks >= 0) {
            const dataToAdd = [];
            for (let i = 1; i <= weeks; i++) {
                dataToAdd.unshift(
                    {
                        date: moment(this.state.planStartDate).subtract(i, 'weeks').format('YYYY-MM-DD'),
                        plan: null,
                        result: null
                    }
                );
            };
            const newData = [...dataToAdd, ...this.state.metricData];
            this.setState({
                planStartDate: nextDate,
                metricData: newData,
                startDateError: false
            });
        } else {
            const newData = this.state.metricData.map(datum => datum);
            for (let i = 1; i <= weeks * -1; i++) {
                newData.shift();
            };
            this.setState({
                planStartDate: nextDate,
                metricData: newData,
                startDateError: false
            });
        };
    };
      
    updatePlanEndDate(date) {
        const { endOfWeek } = this.context;
        if (date === '') {
            this.setState({
                endDateError: false
            });
            return;
        };
        if (date < this.state.latestPlan) {
            this.setState({
                endDateError: true
            });
            return;
        }
        const nextDate = (moment(date).day() === Number(endOfWeek)) ? 
            moment(date).format('YYYY-MM-DD') :
            moment(date).add(6 - moment(date).day(), 'days').format('YYYY-MM-DD');
        const weeks = moment(nextDate).diff(this.state.planEndDate, 'week');
        if (weeks >= 0) {
            const dataToAdd = [];
            for (let i = 1; i <= weeks; i++) {
                dataToAdd.push(
                    {
                        date: moment(this.state.planEndDate).add(i, 'weeks').format('YYYY-MM-DD'),
                        plan: null,
                        result: null
                    }
                );
            };
            const newData = [...this.state.metricData, ...dataToAdd];
            this.setState({
                planEndDate: nextDate,
                metricData: newData,
                endDateError: false
            });
        } else {
            const newData = this.state.metricData.map(datum => datum);
            for (let i = 1; i <= weeks * -1; i++) {
                newData.pop();
            };
            this.setState({
                planEndDate: nextDate,
                metricData: newData,
                endDateError: false
            });
        };
    };

    updatePlan(plan) {
        const { metricData } = this.state;
        const updatedData = metricData.map(datum =>
            (datum.date === plan.id) ? {...datum, plan: Number(plan.value)} : datum);
        this.setState({
            metricData: updatedData
        });
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
        const decimals = this.state.decimals.value;
        if (decimals < 0 || decimals > 5 || decimals === '') {
            return 'Pick a number of decimals between 0 and 5!'
        };
    };

    validateStartDate() {
        if (this.state.startDateError) {
            return `Start Date must be ${moment(this.state.earliestPlan).format('M/D/YYYY')} or earlier!`
        };
    };
    
    validateEndDate() {
        if (this.state.endDateError) {
            return `End Date must be ${moment(this.state.latestPlan).format('M/D/YYYY')} or later!`
        };
    };

    clearStartDateError() {
        this.setState({
            startDateError: false
        });
    };

    clearEndDateError() {
        this.setState({
            endDateError: false
        });
    };

    render() {
        const { team, currentWeek } = this.context;
        const { metricData } = this.state;
        const datesToShow = metricData.filter(datum => 
            datum.date <= this.state.planEndDate && 
            datum.date >= this.state.planStartDate);
        const metricError = this.validateMetric();
        const whoError = this.validateWho();
        const typeError = this.validateType();
        const formatError = this.validateFormat();
        const decimalsError = this.validateDecimals();
        const startDateError = this.validateStartDate();
        const endDateError = this.validateEndDate();
        return (
            <div className='edit-plan-metric'>
                <div className='edit-metric'>
                    <h2 className='edit-metric-title'>Edit a Metric!</h2>
                    <form
                        className='edit-metric-form'
                        onSubmit={this.handleSubmit}>
                            <div className='edit-metric-inputs'>
                                <div className='edit-metric-metric'>
                                    <label htmlFor='metric'>
                                        What's the to-do?
                                    </label>
                                    <textarea
                                        name='metric'
                                        id='metric'
                                        placeholder='Metric!'
                                        value={this.state.metric.value}
                                        onChange={e => this.updateMetric(e.target.value)}/>
                                </div>
                                {this.state.metric.touched && <ValidationError message={metricError} />}
                                <div className='edit-metric-who'>
                                    <label htmlFor='who'>
                                        Whose metric is it?
                                    </label>
                                    <select
                                        type='text'
                                        name='who'
                                        id='who'
                                        value={this.state.who.value}
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
                                <div className='edit-metric-type'>
                                    <label htmlFor='type'>
                                        What type of metric?
                                    </label>
                                    <select
                                        type='text'
                                        name='type'
                                        id='type'
                                        value={this.state.type.value}
                                        onChange={e => this.updateType(e.target.value)}>
                                            <option>--Select a metric type!--</option>
                                            <option value='>'>{'Greater Than (>)'}</option>
                                            <option value='<'>{'Less Than (<)'}</option>
                                    </select>
                                </div>
                                {this.state.type.touched && <ValidationError message={typeError} />}
                                <div className='edit-metric-format'>
                                    <label htmlFor='format'>
                                        What's the metric format?
                                    </label>
                                    <select
                                        type='text'
                                        name='format'
                                        id='format'
                                        value={this.state.format.value}
                                        onChange={e => this.updateFormat(e.target.value)}>
                                            <option>--Select a metric format!--</option>
                                            <option value='number'>Number</option>
                                            <option value='dollars'>Dollars</option>
                                            <option value='percent'>Percentage</option>
                                    </select>
                                </div>
                                {this.state.format.touched && <ValidationError message={formatError} />}
                                <div className='edit-metric-decimals'>
                                    <label htmlFor='decimals'>
                                        How many decimal places do you want to display?
                                    </label>
                                    <input
                                        type='number'
                                        name='decimals'
                                        id='decimals'
                                        placeholder='Decimals...'
                                        value={this.state.decimals.value}
                                        onChange={e => this.updateDecimals(e.target.value)} />
                                </div>
                                {this.state.decimals.touched && <ValidationError message={decimalsError} />}
                                <div className='edit-metric-plan'>
                                    <h2 className='set-plan-title'>
                                        Set your plan!
                                    </h2>
                                    <div className='plan-date-wrapper'>
                                        <div className='plan-start-date'>
                                        <label htmlFor='plan-start-date'>
                                            Plan Start Date:
                                        </label>
                                        <input
                                            type='date'
                                            name='plan-start-date'
                                            id='plan-start-date'
                                            value={this.state.planStartDate}
                                            onKeyDown={e => e.preventDefault()}
                                            onChange={e => this.updatePlanStartDate(e.target.value)}
                                        />
                                        </div>
                                        <div className='plan-end-date'>
                                        <label htmlFor='plan-end-date'>
                                            Plan End Date:
                                        </label>
                                        <input
                                            type='date'
                                            name='plan-end-date'
                                            id='plan-end-date'
                                            value={this.state.planEndDate}
                                            onKeyDown={e => e.preventDefault()}
                                            onChange={e => this.updatePlanEndDate(e.target.value)}
                                        />
                                        </div>
                                        {this.state.startDateError && <ValidationError message={startDateError} />}
                                        {this.state.startDateError && 
                                            <button
                                                type='button'
                                                className='clear-start-date-error'
                                                onClick={() => this.clearStartDateError()}>
                                                    OK
                                            </button>}
                                        {this.state.endDateError && <ValidationError message={endDateError} />}
                                        {this.state.endDateError && 
                                            <button
                                                type='button'
                                                className='clear-end-date-error'
                                                onClick={() => this.clearEndDateError()}>
                                                    OK
                                            </button>}
                                    </div>
                                    {datesToShow.map(datum => 
                                        <div 
                                            key={'div' + datum.date}
                                            className='data-input'>
                                                <>
                                                <label 
                                                    key={'label' + datum.date}
                                                    htmlFor={datum.date}>
                                                        {moment(datum.date).format('M/D/YYYY')}
                                                </label>
                                                <input 
                                                    key={'input' + datum.date}
                                                    type='text'
                                                    name={datum.date}
                                                    id={datum.date}
                                                    defaultValue={datum.plan || ''}
                                                    onChange={e => this.updatePlan(e.target)}
                                                    disabled={datum.date < currentWeek} 
                                                />
                                                </>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='edit-metric-buttons'>
                                <button
                                    type='submit'
                                    disabled={
                                        this.validateMetric() ||
                                        this.validateWho() ||
                                        this.validateType() ||
                                        this.validateFormat() ||
                                        this.validateDecimals()}>
                                    Edit Metric!
                                </button>
                                <button
                                    type='button'
                                    onClick={() => this.props.history.goBack()}>
                                        Cancel
                                </button>
                            </div>
                            <button
                                className='archive-metric-button'
                                type='button'
                                onClick={() => this.handleArchive()}>
                                    Archive<br/>Metric
                            </button>
                    </form>
                </div>
            </div>
        );
    };
};

export default EditMetric;