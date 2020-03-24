import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Todo
        id='1'
        todo='todo'
        who='who'
        created='2020-02-07'
        due='2020-02-14'
        status=''
        reviewed='no'
        issue='1'
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
