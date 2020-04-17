import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/styles';

const styles ={
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginBottom: '-3.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.25)'
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    fontSize: '10px',
    padding: '10px',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: '1px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.5s ease-in-out',
  }
}

function DraggableColorBox(props) {
  const { classes, handleClick, name, color } = props
  return(
    <div className={classes.root} style={{backgroundColor: props.color}} >
      <div className={classes.boxContent}>
        <span>{color} [{name}]</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
      </div>
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox);
