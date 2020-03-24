import React from 'react';
import ReactDOM from 'react-dom';
import EditMetric from './EditMetric';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditMetric />, div);
  ReactDOM.unmountComponentAtNode(div);
});
