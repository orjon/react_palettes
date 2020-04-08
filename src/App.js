import React, { Component } from 'react';
import Palette from './Palette';
import { Route, Switch} from 'react-router-dom';
import seedPalettes from './seedPalettes';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';

class App extends Component {
  findPalette(idToFind){
    return seedPalettes.find(function(palette){
      return palette.id === idToFind;
    })
  }
  render(){
    return (
      <Switch>
        <Route exact path='/' render={() => <PaletteList palettes={seedPalettes}/>} />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
          )}
        />
      </Switch>
    )
  }
}

export default App;
