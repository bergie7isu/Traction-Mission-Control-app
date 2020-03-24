import React from 'react';

const TractionMissionControlContext = React.createContext({
    todos: [],
    issues: [],
    metrics: [],
    team: [],
    endOfWeek: '',
    currentWeek: '',
    addTodo: () => {},
    addIssue: () => {},
    editTodo: () => {},
    editIssue: () => {},
    deleteTodo: () => {},
    deleteIssue: () => {},
    addMetric: () => {},
    editMetric: () => {},
    moveCurrentWeek: () => {},
  });
  
  export default TractionMissionControlContext;