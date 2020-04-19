import React, { Component } from 'react';

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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: '0',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class PaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props){
    super(props);
    this.state = {
      open: true,
      currentColor: 'teal',
      newColorName: '',
      newPaletteName: '',
      // paletteColors: []
      paletteColors: this.props.palettes[0].colors
    }
  }


  componentDidMount(){
    ValidatorForm.addValidationRule('colorNameUnique', value => 
      this.state.paletteColors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule('colorUnique', value => 
    this.state.paletteColors.every(
      ({color}) => color !== this.state.currentColor
     )
    )
    ValidatorForm.addValidationRule('paletteNameUnique', value => 
    this.props.palettes.every(
      ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
    )
  )
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (newColor) => {
    this.setState({currentColor: newColor.hex})
  }

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({
      paletteColors: [...this.state.paletteColors, newColor],
      newColorName: ''})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value})
  }

  addRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat()
    let randomColor = allColors[(Math.floor(Math.random()*allColors.length))]
    this.setState({ paletteColors: [...this.state.paletteColors, randomColor]})
  }

  handleSubmit = () => {
    let newName = this.state.newPaletteName
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g,'-'),
      colors: this.state.paletteColors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  removeColor = (colorName) => {
    this.setState({
      paletteColors: this.state.paletteColors.filter(color => color.name !== colorName)
    })
  }

  removeAllColors = () =>{
    this.setState({paletteColors: []})
  }
 
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({paletteColors}) => ({
      paletteColors: arrayMove(paletteColors, oldIndex, newIndex)
    }))
  }

  render() {
    const { classes, maxColors } = this.props;
    const { open } = this.state;
    let paletteFull = this.state.paletteColors.length >= maxColors

  

    return (
      <div className={classes.root}>
        {console.log(paletteFull)}
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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label='Palette Name'
                name='newPaletteName'
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'paletteNameUnique']}
                errorMessages={['Enter palette name', 'Palette name must be unique']}
              />
              <Button variant='contained' color='primary' type='submit'>
              Save Palette
              </Button>
            </ValidatorForm>
            
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant='h4'>New Palette</Typography>
          <div>
            <Button 
              variant='contained'
              color='secondary'
              onClick={this.removeAllColors}
            >
              Clear Palette
            </Button>
            <Button
              variant='contained'
              color='primary'
              disabled={paletteFull}
              onClick={this.addRandomColor}
            >
              Random color
            </Button>
          </div>

          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newColorName}
              name='newColorName'
              onChange={this.handleChange}
              validators={[
                'required',
                'colorNameUnique',
                'colorUnique'
              ]}
              errorMessages={[
                'This field is required',
                'Color name must be unique',
                'Color must be unique'
              ]}/>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={paletteFull}
              style={{backgroundColor: paletteFull ? 'grey' : this.state.currentColor}}>
              {paletteFull ? 'Palette Full!' : 'Add Color'}
            </Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            paletteColors={this.state.paletteColors}
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteForm);

