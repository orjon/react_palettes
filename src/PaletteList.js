import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 

class PaletteList extends Component {
  render() {
    const palettes = this.props.palettes.map(palette => (
      <li>
        <Link to={`/palette/${palette.id}`}>
          {palette.paletteName} {palette.emoji}
        </Link>
      </li>

    ))
    return(
      <div className='PaletteList'>
        <h1>Palette List 5000</h1>
        <ul>
          {palettes}
        </ul>
      </div>

    )
  }
}

export default PaletteList;
