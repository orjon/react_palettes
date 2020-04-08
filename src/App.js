import React, { Component } from 'react';
import Palette from './Palette';
import { Route, Switch} from 'react-router-dom';
import seedPalettes from './seedPalettes';
import {generatePalette} from './colorHelpers';

class App extends Component {
  findPalette(idToFind){
    return seedPalettes.find(function(palette){
      return palette.id === idToFind;
    })
  }
  render(){
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>Palette list here</h1>} />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
          )}
        />
      </Switch>
  
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalettes[4])}/>
      // </div>
    )
  }
}

export default App;
