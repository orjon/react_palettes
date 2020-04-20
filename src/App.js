import React, { Component } from 'react';
import Palette from './Palette';
import { Route, Switch} from 'react-router-dom';
import seedPalettes from './seedPalettes';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
import PaletteNew from './PaletteNew';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state ={
      palettes: savedPalettes || seedPalettes
    }
  }
  findPalette = (idToFind) => {
    return this.state.palettes.find(function(palette){
      return palette.id === idToFind;
    })
  }

  deletePalette = (idToDelete) => {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== idToDelete)}),
      this.saveLocalStorage
    )
  }

  savePalette = (newPalette) => {
    this.setState(
      {palettes: [...this.state.palettes, newPalette]},
      this.saveLocalStorage
    )
  }

  saveLocalStorage(){
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render(){
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => (
            <PaletteNew
              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
          )}
        />
        <Route 
          exact
          path='/'
          render={(routeProps) => (
            <PaletteList 
              palettes={this.state.palettes}
              {...routeProps}
              deletePalette={this.deletePalette}
              />
          )}
        />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>
          )}
        />
      </Switch>
    )
  }
}

export default App;
