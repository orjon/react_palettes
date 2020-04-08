import React, { Component } from 'react'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css'; 
// Place this before own styles!!
import './NavBar.css';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state= {
      format: 'hex'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({format: e.target.value});
    this.props.handleChange(e.target.value);
  }
  render(){
    const {level, changeLevel} = this.props
    return(
      <header className='NavBar'>
        <div className='logo'>
          <a href='http://www.orjon.com/'>Palettes</a>
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
        <div className='select-container'>
        <Select 
          value={this.state.format}
          onChange={this.handleChange}>
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
        </div>
        
      </header>
    )
  }
  
}

export default NavBar;