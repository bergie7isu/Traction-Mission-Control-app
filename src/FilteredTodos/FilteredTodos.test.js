import React from 'react';
import ReactDOM from 'react-dom';
import FilteredTodos from './FilteredTodos';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilteredTodos />, div);
  ReactDOM.unmountComponentAtNode(div);
});
