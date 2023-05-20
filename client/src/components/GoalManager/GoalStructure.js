
export default function GoalStructure(props) {

  const { chain } = props;

  console.log(chain);
  const renderedChain = chain.display().map((g, i) => {
    return g.goal && <span key={i}>{g.goal.title} {i > 0 && '>'} </span>;
  }).reverse();

  return (
    <header className='GoalStructure'>{renderedChain}</header>
  );
};