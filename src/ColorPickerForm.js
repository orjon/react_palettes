import React, { Component } from 'react'
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


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
    const { paletteFull } = this.props
    return(
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.handleSumbit}>
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
      </div>
    )
  }
}

export default ColorPickerForm;