import React from 'react';
import ReactDOM from 'react-dom';
import EditIssue from './EditIssue';
import { BrowserRouter, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Route path='/EditIssue/1'>
        <EditIssue />
      </Route>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
