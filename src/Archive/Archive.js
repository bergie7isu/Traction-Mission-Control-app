import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import FilteredTodos from '../FilteredTodos/FilteredTodos';
import FilteredIssues from '../FilteredIssues/FilteredIssues';
import './Archive.css';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'To-dos'
    };
  };

  updateSelected(selected) {
    this.setState({
      selectedItem: selected
    });
  };

  displayFilter() {
    if (this.state.selectedItem === 'To-dos') {
      return <FilteredTodos />
    } else if (this.state.selectedItem === 'Issues') {
      return <FilteredIssues />
    }
  };

  render() {
    return (
      <div className='archive'>
        <Nav />
        <h1 className='route-heading'>Archive</h1>
        <div className='archive-select'>
          <div className='select-wrapper'>
            <label htmlFor='select'>
              What do you want to filter?
            </label>
            <select
              className='filter-select'
              type='text'
              name='select'
              id='select'
              value={this.state.selectedItem}
              onChange={e => this.updateSelected(e.target.value)}>
                <option>To-dos</option>
                <option>Issues</option>
            </select>
          </div>
            
        </div>
        {this.displayFilter()}
      </div>
    );
  };
};

export default Archive;