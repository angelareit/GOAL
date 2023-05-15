import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.scss"


import  RightDrawer  from './RightDrawer';
import  LeftDrawer  from './LeftDrawer';


export default function Home (props) {
  return (
    <main>
      <LeftDrawer/>
      <div><h3> GOAL TREE</h3></div>
      <RightDrawer/>
      {/*   <Chat/> */}
    </main>
  );
}

