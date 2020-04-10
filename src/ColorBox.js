import React, { Component } from 'react';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';


class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      copied: false
    }
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState(){
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied:false}), 1500)
    })
  }

  goToMore(){
    this.props.history.push(`/`)
  }

  render(){
    const {name, background, paletteId, colorId, showMoreLink} = this.props;
    const isDarkColor=(chroma(background).luminance()) <= 0.085;
    const isLightColor=(chroma(background).luminance()) <= 0.085;

    return(
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{background: background}} className='ColorBox'>
        <div style={{background: background}} className={`copy-overlay ${this.state.copied && 'show'}`}/>
        <div style={{background: background}} className={`copy-message ${this.state.copied && 'show'}`}>
          <h1>copied</h1>
          <p>{this.props.background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <div className={isDarkColor && 'light-text'}>{background}</div>
            <div className={isDarkColor && 'light-text'}>{name}</div>
          </div>
          <button className='copy-button'>Copy</button>
        </div>
        {showMoreLink &&  <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation }>
        {/* <div onClick={() => this.goToMore} ></div> */}
         <span className='see-more'>more </span>
        </Link>}
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox;