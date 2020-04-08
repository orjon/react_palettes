import React, { Component } from 'react';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

  render(){
    const {name, background} = this.props
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
            <div>{background}</div>
            <div>{name}</div>
          </div>
          <button className='copy-button'>Copy</button>
        </div>
        <span className='see-more'>more </span>
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox;