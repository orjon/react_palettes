import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
  constructor(props){
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
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
  render() {
    
    const colorBoxes = this._shades.map( shade => 
      <ColorBox
        background={shade.hex}
        name={shade.name}
        key={shade.id}
        showMoreLink={false}
      />
    )
    return(
      <div className='Palette'>
        <div className='Palette-colors'>
          {colorBoxes}
        </div>
      </div>

    )
  }
}

export default SingleColorPalette;
