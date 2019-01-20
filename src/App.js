import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import 'tachyons'; 
import Rank from './components/Rank/Rank';
import FaceRecoganition from './components/FaceRecoganition/FaceRecoganition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


// https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_743,c_limit/best-face-oil.png
const app = new Clarifai.App({
  apiKey: 'e56075d75e684fbcad6872b039804ceb'
 });
class App extends Component {
  constructor(){
    super();
    this.state = {
    input : '',
    imageUrl : '',
    box :{},
    route : 'signin',
    isSignedIn : false
    }
  }
  calculateFaceLocation = (data) =>
  {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(clarifaiFace);
    const image = document.getElementById('inputImage');
   
    const width = Number(image.width);
    const height = Number(image.height);
  
    return{
      leftCol :clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row *height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box : box})
  }
  onInputChange = (event) =>{
    this.setState({input : event.target.value});
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response =>
      this.displayFaceBox(this.calculateFaceLocation(response))).catch(err =>console.log(err));
  
  }

  onRouteChange = ( route) =>{
    if( route === 'signout'){
      this.setState({isSignedIn : false})
    }
    else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route});
  }
  render() {
    return (
      <div className="App">    
        <Navigation issignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
        {
        this.state.route === 'home'
        ?
        <div><Logo />
        <Rank/>
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecoganition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
        </div>
        :(
          this.state.route === 'signin'?
          <SignIn onRouteChange = {this.onRouteChange}/>:
          <Register onRouteChange = {this.onRouteChange}/>
        )
       
        
        }
      </div>
    );
  }
}

export default App;
