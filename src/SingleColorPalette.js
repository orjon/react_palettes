import React, { Component } from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
  constructor(props){
    super(props);
    this.state ={
      format: 'hex'
    };
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.changeColorFormat=this.changeColorFormat.bind(this);
  }

  gatherShades(palette, colorToFilterBy){
    let shades = []
    let allColors = palette.colors

    for (let key in allColors){
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    
    }
    shades = shades.slice(1);
    return shades;
  }

  changeColorFormat(value){
    this.setState({format: value})
  }

  render() {

    const {emoji, paletteName, id} = this.props.palette;
    const { format } = this.state

    
    const colorBoxes = this._shades.map( shade => 
      <ColorBox
        background={shade[format]}
        name={shade.name}
        key={shade.name}
        showMoreLink={false}
      />
    )
    return(
      <div className='SingleColorPalette Palette'>
        <NavBar
          showSlider={false}
          handleChange={this.changeColorFormat}/>
        {/* <NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeColorFormat}/> */}
        <div className='Palette-colors'>
          {colorBoxes}
          <div className='backToPalette ColorBox'>
            <Link to={`/palette/${id}`} className='back-button'>BACK</Link>
          </div>
        </div>
        <footer className='Palette-footer'>
          {paletteName}
          <span className='emoji'> {emoji}- {this.props.colorId.toUpperCase()}</span>
        </footer>
      </div>

    )
  }
}

export default SingleColorPalette;
