import React from 'react';
import ReactDOM from 'react-dom';
import MetricResult from './MetricResult';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MetricResult 
        metricId='1'
        metric_type='>'
        metric_format='number'
        decimals='2'
        result='none'
        date='2020-02-02'
        status='active'
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
