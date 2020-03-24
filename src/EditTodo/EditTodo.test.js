import React from 'react';
import ReactDOM from 'react-dom';
import EditTodo from './EditTodo';
import { BrowserRouter, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Route path='/EditTodo/1'>
        <EditTodo />
      </Route>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
