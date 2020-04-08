import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
// Place this before own styles!!
import './NavBar.css';

class NavBar extends Component {
  render(){
    const {level, changeLevel} = this.props
    return(
      <header className='NavBar'>
        <div className='logo'>
          <a href='#'>Palette</a>
        </div>
        <div className='slider-level'>
            LEVEL: {level}
        </div>
        <div className='slider'>
          <Slider
            defaultValue={level}
            step={100}
            min={100}
            max={900}
            onAfterChange={changeLevel}/>
        </div>
      </header>
    )
  }
  
}

export default NavBar;