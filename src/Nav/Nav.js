import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <h1 className='app-title'>
          Traction Mission Control
        </h1>
        <div className='nav-link'>
            <NavLink
              to='/L10Meeting'
              exact
              className='link'
              activeClassName='selected'
              onClick={() => window.scrollTo(0, 0)}
            >
              L-10 Meeting
            </NavLink>
        </div>
        <div className='nav-link'>
            <NavLink
              to='/Scorecard'
              exact
              className='link'
              activeClassName='selected'
              onClick={() => window.scrollTo(0, 0)}
            >
              Scorecard
            </NavLink>
        </div>
        <div className='nav-link'>
        <NavLink
              to='/Archive'
              exact
              className='link'
              activeClassName='selected'
              onClick={() => window.scrollTo(0, 0)}
            >
              Archive
            </NavLink>
        </div>
        <div className='nav-link'>
        <NavLink
              to='/'
              exact
              className='link'
              activeClassName='selected'
              onClick={() => window.scrollTo(0, 0)}
            >
              Splash
            </NavLink>
        </div>
      </nav>
    );
  };
};

export default Nav;