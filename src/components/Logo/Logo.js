import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './face.jpg';
const Logo =()=>
{
    return (
       <div className = 'ma4 mt0'>
          <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 100, width: 100 }} >
          <div className="Tilt-inner"> <img alt = 'logo' src={face}/> </div>
       </Tilt>
</div>
    );
}
export default Logo;