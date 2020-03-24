import React from 'react';
import ReactDOM from 'react-dom';
import Issues from './Issues';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Issues />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
