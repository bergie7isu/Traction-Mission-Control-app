import React from 'react';
import ReactDOM from 'react-dom';
import ActiveMetrics from './ActiveMetrics';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ActiveMetrics 
        dates_to_show={[]}
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
