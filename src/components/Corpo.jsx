import React, { useState } from 'react';
import Posts from './Posts';
import SideBar from './SideBar';
import Stories from './Stories';

function Corpo() {
  const [userName, setUserName] = useState('Catana');

  return (
    <div>
      <div className="corpo">
        <div className="esquerda">
          <Stories />
          <Posts userName={userName} setUserName={setUserName} />
        </div>
        <SideBar userName={userName} setUserName={setUserName} />
      </div>
    </div>
  );
}

export default Corpo;
