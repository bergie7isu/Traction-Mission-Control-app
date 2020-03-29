import React from 'react';
import ReactDOM from 'react-dom';
import Metric from './Metric';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Metric 
        id='1'
        status='active'
        who='who'
        metric_name='name'
        metric_type='>'
        metric_format='number'
        decimals='2'
        data={[]}
        dates_to_show={[]}
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

