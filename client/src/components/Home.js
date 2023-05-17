import "./Home.scss";

import  RightSidebar  from './RightSidebar';
import  LeftSidebar  from './LeftSidebar/LeftSidebar';

export default function Home(props) {
  return (
    <main className="Home">
      <LeftSidebar />
      <div className="goal-manager"><h3> GOAL TREE</h3></div>
      <RightSidebar />
    </main>
  );
}

