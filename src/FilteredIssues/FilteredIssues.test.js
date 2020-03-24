import React from 'react';
import ReactDOM from 'react-dom';
import FilteredIssues from './FilteredIssues';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilteredIssues />, div);
  ReactDOM.unmountComponentAtNode(div);
});
