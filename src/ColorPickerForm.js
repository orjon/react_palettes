import React, { Component } from 'react'
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles  = {
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColorButton: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem'
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
  }

};

class ColorPickerForm extends Component {
  constructor(props){
    super(props);
    this.state={
      currentColor: 'teal',
      newColorName:''
    }
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('colorNameUnique', value => 
      this.props.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule('colorUnique', value => 
    this.props.colors.every(
      ({color}) => color !== this.state.currentColor
     )
    )
  }


  updateCurrentColor = (newColor) => {
    this.setState({currentColor: newColor.hex})
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value})
  }


  handleSumbit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.props.addNewColor(newColor)
    this.setState({newColorName: ''})
  }

  render(){
    const { paletteFull, classes } = this.props
    return(
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={this.updateCurrentColor}
          className= {classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSumbit}>
          <TextValidator
            className={classes.colorNameInput}
            value={this.state.newColorName}
            name='newColorName'
            variant='filled'
            margin='normal'
            placeholder='Color name'
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
            className={classes.addColorButton}
            type='submit'
            variant='contained'
            color='primary'
            disabled={paletteFull}
            style={{backgroundColor: paletteFull ? 'grey' : this.state.currentColor}}>
            {paletteFull ? 'Palette Full!' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);