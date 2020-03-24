import React from 'react';
import ReactDOM from 'react-dom';
import Archive from './Archive';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Archive />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
