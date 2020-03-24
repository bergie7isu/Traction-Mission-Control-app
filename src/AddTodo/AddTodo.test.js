import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './AddTodo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTodo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
