import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: '1'
    }
  },
  colors: {
    backgroundColor: 'white',
    height: '150px',
    width: '100%'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5 rem'
  },
  miniColor:{
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px'
  },
  deleteIcon: {
    color: 'white',
    backgroundColor: 'red',
    zIndex: '10',
    width: '20px',
    height: '20px',
    position: 'absolute',
    padding: '10px',
    top: '0',
    right: '0',
    zIndex: '10',
    opacity: '0',
    transition: 'all 0.3s ease-in-out !important'
  }
}




class MiniPalette extends Component{


  deletePalette = (e) =>{
    e.stopPropagation();
    this.props.handleDelete(this.props.id)
  }

  render(){
    const { classes, paletteName, emoji, colors } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{backgroundColor: color.color}}
        key={color.name}
      />
    ))

    return(
      <div className={classes.root} onClick={this.props.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}/>
        <div className={classes.colors}>
          {miniColorBoxes}
        </div>
        <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
      </div>
    )
  }
}

export default withStyles(styles)(MiniPalette);