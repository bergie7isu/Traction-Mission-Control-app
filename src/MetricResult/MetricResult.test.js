import React from 'react';
import ReactDOM from 'react-dom';
import Metric from './Metric';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Metric />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
