import React from 'react';
import ReactDOM from 'react-dom';
import AddIssue from './AddIssue';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddIssue />, div);
  ReactDOM.unmountComponentAtNode(div);
});
