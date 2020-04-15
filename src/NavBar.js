import React, { Component } from 'react'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css'; 
// Place this before own styles!!
import './NavBar.css';

const styles = {
  NavBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
    backgroundColor: 'lightgrey'
  },
  logo: {
    height: '100%',
    marginRight: '15px',
    padding: '0 13px',
    width: '125px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(148, 34, 120)',
    '& a': {
      fontFamily: 'Gotu, sans-serif',
      textDecoration: 'none',
      color: 'rgb(0, 221, 221)',
      textTransform: 'uppercase',
      fontWeight: '600',
      fontSize: '1.5rem'
    }
  },
  sliderLevel: {
    fontSize: '0.8rem',
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
  }
}

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
    const {level, changeLevel, showSlider, classes} = this.props
    return(
      <div>
        <header className={classes.NavBar}>
          <div className={classes.logo}>
            <Link to='/'>Palettes</Link>
          </div>
          {showSlider &&  
            <div className={classes.sliderLevel}>
                LEVEL: {level}
            </div>
          }
          {showSlider &&
            <div className={classes.slider}>
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

export default withStyles(styles)(NavBar);