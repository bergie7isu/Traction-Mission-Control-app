import React, { Component } from 'react';
import './ValidationError.css';

class ValidationError extends Component {
    render() {
        return (
            <div className='error-message'>
                {this.props.message}
            </div>
        )
    }
}

export default ValidationError;