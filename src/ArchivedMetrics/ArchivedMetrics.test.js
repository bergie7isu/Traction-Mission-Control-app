import React from 'react';
import ReactDOM from 'react-dom';
import ArchivedMetrics from './ArchivedMetrics';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ArchivedMetrics
        dates_to_show={[]}
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
