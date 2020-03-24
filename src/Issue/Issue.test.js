import React from 'react';
import ReactDOM from 'react-dom';
import Issue from './Issue';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
      <Issue 
        id='1' 
        issue='issue' 
        who='who' 
        created='2020-02-07' 
        status=''
        reviewed='no'
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
