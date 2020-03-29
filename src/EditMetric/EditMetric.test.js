import React from 'react';
import ReactDOM from 'react-dom';
import EditMetric from './EditMetric';
import { BrowserRouter, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Route path='/EditMetric/1'>
        <EditMetric />
      </Route>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
