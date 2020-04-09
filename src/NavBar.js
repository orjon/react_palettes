import React, { Component } from 'react'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css'; 
// Place this before own styles!!
import './NavBar.css';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state= {
      format: 'hex',
      snackbarOpen: false
    }
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e){
    this.setState({format: e.target.value, snackbarOpen: true});
    this.props.handleChange(e.target.value);
  }

  closeSnackbar(){
    this.setState({snackbarOpen: false})
  }

  render(){
    const {level, changeLevel, showSlider} = this.props
    return(
      <div>
        <header className='NavBar'>
          <div className='logo'>
            <Link to='/'>Palettes</Link>
          </div>
          {showSlider &&  
            <div className='slider-level'>
                LEVEL: {level}
            </div>
          }
          {showSlider &&
            <div className='slider'>
              <Slider
                defaultValue={level}
                step={100}
                min={100}
                max={900}
                onAfterChange={changeLevel}/>
            </div>
          }
          <div className='select-container'>
          <Select 
            value={this.state.format}
            onChange={this.handleFormatChange}>
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
          </div>
          <Snackbar
            autoHideDuration={2500}
            onClick={this.closeSnackbar}
            onClose={this.closeSnackbar}
            anchorOrigin={{vertical:'bottom', horizontal:'left'}}
            open={this.state.snackbarOpen}
            message={<span>Format changed to {this.state.format.toUpperCase()}</span>}/>
        </header>

      </div>

    )
  }
  
}

export default NavBar;