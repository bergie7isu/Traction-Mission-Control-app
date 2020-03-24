import React from 'react';
import ReactDOM from 'react-dom';
import AddMetric from './AddMetric';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMetric />, div);
  ReactDOM.unmountComponentAtNode(div);
});
