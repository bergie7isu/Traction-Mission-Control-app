import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';
import rocket from '../images/rocket.gif';

class Splash extends Component {
    render() {
        return (
            <div className='splash'>
                <header className='splash-header'>
                    <h1 className='splash-header-title'>Traction Mission Control</h1>
                    <h2 className='splash-header-sub'>Drive accountability.</h2>
                    <h2 className='splash-header-sub'>Get more done.</h2>
                    <h2 className='splash-header-sub'>Grow your business!</h2>
                    <p className='splash-header-description'>The Traction Mission Control App is your go-to tool for driving accountability, follow-through, and consistent communication in your organization running on the EOS Platform.</p>
                    <Link to='/L10Meeting'>
                        <button
                            className='go-to-app-button'
                            onClick={() => window.scrollTo(0, 0)}>
                                Let's Do This!
                        </button>
                    </Link>
                </header>
                <section className='big-rocket'>
                    <img src={rocket} alt='rocket' className='rocket-gif-big'/>
                </section>
                <section className='rocket-wrapper'>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                    <section className='splash-sub-item'>
                        <h2 className='splash-sub-title'>L-10 Meetings</h2>
                        <p className='splash-sub-description'>Run your weekly L-10 Meetings like a boss. With your Agenda, To-do List, and Issues List right at your fingertips, you're ready to crush this.</p>
                    </section>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                </section>
                <section className='rocket-wrapper'>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                    <section className='splash-sub-item'>
                        <h2 className='splash-sub-title'>To-dos</h2>
                        <p className='splash-sub-description'>Document action items in your L-10 Meetings and drive team accountability to complete tasks on-time, every time. Link to-dos directly to the issues they solve, and track completion performance right in the app! When everyone gets their tasks done, the team wins!</p>
                    </section>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                </section>
                <section className='rocket-wrapper'>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                    <section className='splash-sub-item'>
                        <h2 className='splash-sub-title'>Issues</h2>
                        <p className='splash-sub-description'>We've all got issues. Keeping track of them in your L-10 Meeting and solving them forever can be hard. Let Traction Mission Control help!</p>
                    </section>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                </section>
                <section className='rocket-wrapper'>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                    <section className='splash-sub-item'>
                        <h2 className='splash-sub-title'>Scorecard</h2>
                        <p className='splash-sub-description'>Relentlessly monitor your organization's most important metrics, and drive action when they're off-track. Observe trends and chart the course for the future all in one spot!</p>
                    </section>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                </section>
                <section className='rocket-wrapper'>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                    <section className='splash-sub-item'>
                        <h2 className='splash-sub-title'>Archive Filtering</h2>
                        <p className='splash-sub-description'>Quickly view and filter archived to-dos and issues for yourself and your team. View historical performance data to drive accountability discussions.</p>
                    </section>
                    <img src={rocket} alt='rocket' className='rocket-gif-small'/>
                </section>
                <section className='big-rocket'>
                    <img src={rocket} alt='rocket' className='rocket-gif-big'/>
                </section>    
                <footer className='splash-footer'>
                    <h2 className='splash-footer-title'>Traction Mission Control</h2>
                    <h3 className='splash-footer-sub-title'>Do it.</h3>
                    <Link to='/L10Meeting'>
                        <button 
                            className='go-to-app-button small'
                            onClick={() => window.scrollTo(0, 0)}>
                                Go for Launch!
                        </button>
                    </Link>
                </footer>
            </div>
        );
    };
};

export default Splash;