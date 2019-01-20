import React from 'react';
import './FaceRecoganition.css';
const FaceRecoganition = ({ imageUrl , box }) =>{
    return (
        <div className = 'center ma'>
        <div className = 'mt3 absolute grow shadow-5'>
        <img id = 'inputImage' alt = "Enter Url" src = {imageUrl} width = '400px' height = 'auto'/>
        <div className = 'bb' style = {{top : box.topRow , right : box.rightCol , bottom : box.bottomRow , left : box.leftCol}}>

        </div>
        </div>
        </div>
    )
}
export default FaceRecoganition;