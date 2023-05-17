import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.scss"


import  RightSidebar  from './RightSidebar';
import  LeftSidebar  from './LeftSidebar/LeftSidebar';


export default function Home (props) {
  return (
    <main>
      <LeftSidebar/>
      <div><h3> GOAL TREE</h3></div>
      <RightSidebar/>
      {/*   <Chat/> */}
    </main>
  );
}

