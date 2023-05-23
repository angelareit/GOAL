
export default function GoalStructure(props) {

  const chain = props.chain.display();
  const renderedChain = chain.map((g, i) => {
    return g.goal && <span key={i}>{g.goal.title} {i > 0 && '>'} </span>;
  }).reverse();

  return (
    <header className='GoalStructure'>{renderedChain}</header>
  );
};