import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


class PaletteSaveModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      stage: 'paletteName',
      newPaletteName: '',
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value})
  }

  showEmojiPicker = () =>{
    this.setState({ stage: 'paletteEmoji' });

  }

  savePalette = (emoji) => {
    const newPalette = {paletteName: this.state.newPaletteName, emoji: emoji.native}
    this.props.handleSubmit(newPalette)
  }


  render() {
    return (
      <div>
        <Dialog
         open={this.state.stage==='paletteEmoji'}
         onClose={this.props.hideSaveForm}
        >
          <DialogTitle id="form-dialog-title">Choose Palette emoji</DialogTitle>
          <Picker onSelect={this.savePalette}/>
        </Dialog>
        <Dialog
          open={this.state.stage==='paletteName'}
          onClose={this.props.hideSaveForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose Palette name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Enter unique name for new Palette.
              </DialogContentText>
              
                  <TextValidator
                    label='Palette Name'
                    name='newPaletteName'
                    fullWidth
                    margin='normal'
                    value={this.state.newPaletteName}
                    onChange={this.handleChange}
                    validators={['required', 'paletteNameUnique']}
                    errorMessages={['Enter palette name', 'Palette name must be unique']}
                  />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.hideSaveForm} color="primary">
                Cancel
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                  Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}



export default PaletteSaveModal;

 