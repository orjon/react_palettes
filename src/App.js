import React, { Component } from 'react';
import Palette from './Palette';
import { Route, Switch} from 'react-router-dom';
import seedPalettes from './seedPalettes';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
import PaletteNew from './PaletteNew';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
  findPalette(idToFind){
    return seedPalettes.find(function(palette){
      return palette.id === idToFind;
    })
  }
  render(){
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={() => <PaletteNew />}
        />
        <Route 
          exact
          path='/'
          render={(routeProps) => (
            <PaletteList palettes={seedPalettes} {...routeProps}/>
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
