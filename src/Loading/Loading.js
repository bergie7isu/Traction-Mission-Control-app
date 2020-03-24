import React, { Component } from 'react';
import './Loading.css';
import rocket from '../images/rocket.gif';

class Loading extends Component {
  render() {
    return (
      <div className='waiting-to-load'>
        <h2 className='waiting-to-load-message'>
          Warming up the server...standby!!!
        </h2>
        <img src={rocket} alt='rocket' className='rocket-gif-big'/>
      </div>
    );
  };
};

export default Loading;