import React from "react";
import './CreateMainGoal.scss'

export default function Header(props) {

  return (
    <header className="">
      <h4 className="">{props.mode}</h4>
    </header>
    );
}