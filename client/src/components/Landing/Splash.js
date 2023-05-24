import React from 'react';
import logo from '../../images/GOAL-Logo.svg';
import './Landing.scss';

export default function Splash(props) {
  return (
    <section className='Splash'>
      <header>
        <img className='logo' alt='GOAL' src={logo} />
        <h1>GOAL</h1>
      </header>
      <article>
        <h2>Growth Organization Achievement Life</h2>
        <p>Our mission is to help you stay on track and finish what you set out to do and we’ve approached it from a personal and a social perspective. GOAL is a tool to help you organize and achieve your objective that much easier as well as help you get in touch with a single accountability buddy to encourage one another and to report to in order to help you stay on task and persist with your progress.</p>
      </article>
    </section>
  );
}