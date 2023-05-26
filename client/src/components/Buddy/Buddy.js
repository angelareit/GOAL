import React from 'react';

export default function Buddy (props) {  
  const [buddy] = props.buddy
  return (
    <>
    {buddy? <No_Buddy />:<Show_Buddy />}
    </>
)}