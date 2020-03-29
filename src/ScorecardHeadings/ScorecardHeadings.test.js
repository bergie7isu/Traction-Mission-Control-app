import React from 'react';
import ReactDOM from 'react-dom';
import ScorecardHeadings from './ScorecardHeadings';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ScorecardHeadings 
        dates_to_show={[]}
        type='active'
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
