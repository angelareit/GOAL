import React from "react";
import MainGoalItem from "./MainGoalItem";

export default function MainGoalList(props) {

  const mainGoals = props.goals.map((goal) => {
    return <MainGoalItem
      key={goal.id} 
      title={goal.title}
      />
  });

  return (
    <ul> {mainGoals} </ul>
  );

}