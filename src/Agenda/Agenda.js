import React, { Component } from 'react';
import './Agenda.css';

class Agenda extends Component {
    render() {
        return (
            <div className='agenda'>
                <h2 className='agenda-title'>Agenda</h2>
                <table>
                    <tbody>
                        <tr>
                            <th className='top-left'>Topic</th>
                            <th>Guidelines</th>
                            <th className='top-right'>Duration</th>
                        </tr>
                        <tr>
                            <td>Segue</td>
                            <td>Personal Best / Business Best</td>
                            <td>5 min</td>
                        </tr>
                        <tr>
                            <td>Scorecard</td>
                            <td>No Discussion</td>
                            <td>5 min</td>
                        </tr>
                        <tr>
                            <td>Rocks</td>
                            <td>"On-track" or "Off-track"</td>
                            <td>5 min</td>
                        </tr>
                        <tr>
                            <td>Headlines</td>
                            <td>Customer / Vendor / Employee</td>
                            <td>5 min</td>
                        </tr>
                        <tr>
                            <td>To-do List</td>
                            <td>"Done" or "Not Done"</td>
                            <td>5 min</td>
                        </tr>
                        <tr>
                            <td>IDS</td>
                            <td>Identify, Discuss, Solve</td>
                            <td>60 min</td>
                        </tr>
                        <tr>
                            <td className='bottom-left'>Conclude</td>
                            <td>Recap To-do List, Cascading Messages, Rating</td>
                            <td className='bottom-right'>5 min</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
};

export default Agenda;