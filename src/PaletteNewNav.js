import React, { Component } from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import PaletteSaveModal from './PaletteSaveModal';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navButtons: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none'
    }
  },
  button: {
    margin: '0 0.5rem'
  }

});

class PaletteNewNav extends Component {
  constructor(props){
    super(props);
    this.state ={
      showSaveForm: false
    }
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('paletteNameUnique', value => 
    this.props.palettes.every(
      ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
    )
   )
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      saveFormOpen : false
    })
  }

  showSaveForm = () =>{
    this.setState({saveFormOpen: true})
  }

  hideSaveForm = () =>{
    this.setState({saveFormOpen: false})
  }


  render() {
    const { classes, open} = this.props
    return(
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create New Palette
            </Typography>
          </Toolbar>
          <div className={classes.navButtons}>
            <Link to='/'>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}>
                  Back to Palettes
              </Button>
            </Link>
            <Button
              variant='contained'
              color="primary"
              onClick={this.showSaveForm}
              className={classes.button}>
              Save Palette
            </Button>
          </div>
        </AppBar>
        {this.state.saveFormOpen && (
          <PaletteSaveModal handleSubmit={this.props.handleSubmit} hideSaveForm={this.hideSaveForm}/>
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteNewNav);