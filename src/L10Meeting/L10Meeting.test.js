import React from 'react';
import ReactDOM from 'react-dom';
import L10Meeting from './L10Meeting';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <L10Meeting />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
