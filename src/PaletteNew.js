import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteNewNav from './PaletteNewNav';
import ColorPickerForm from './ColorPickerForm';

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
      colors: this.props.palettes[0].colors
    }
  }




  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };



  addNewColor = (newColor) => {
    this.setState({
      colors: [...this.state.colors, newColor]})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value})
  }

  handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g,'-'),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  } 

  addRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat()
    let randomColor = allColors[(Math.floor(Math.random()*allColors.length))]
    this.setState({ colors: [...this.state.colors, randomColor]})
  }

  removeColor = (colorName) => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  removeAllColors = () =>{
    this.setState({colors: []})
  }
 
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }))
  }

  render() {
    const { classes, maxColors } = this.props;
    const { open } = this.state;
    let paletteFull = this.state.colors.length >= maxColors

  

    return (
      <div className={classes.root}>
        {console.log(paletteFull)}
        <PaletteNewNav
          handleSubmit={this.handleSubmit}
          open={open}
          classes={classes}
          palettes={this.props.palettes}
          savePalette={this.props.savePalette}
          handleDrawerOpen={this.handleDrawerOpen }
        />
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

          <ColorPickerForm colors={this.state.colors} paletteFull={paletteFull} addNewColor={this.addNewColor}/>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={this.state.colors}
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

