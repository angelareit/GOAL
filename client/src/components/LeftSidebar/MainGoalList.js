import React from "react";
import MainGoalItem from "./MainGoalItem";
import './MainGoalList.scss'

export default function MainGoalList(props) {

  const mainGoals = props.goals.map((goal) => {
    return <MainGoalItem
      key={goal.id}
      title={goal.title}
    />
  });

  return (
    <section className='main-goal-list'>
      <h4>Main Goals</h4>
      <ul> {mainGoals} </ul>
    </section>
  );

}