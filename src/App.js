import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines} from 'react-vis';

let N=10000;

function serieEscalonada(x){
      let n = 1;
      let sum = 0;
      while(n<=N){
        sum += (2 / (n * Math.PI)) * (1-(Math.pow((-1),n))) * Math.sin(n*x);
        n++;
      }
      return sum;
}

function getData(){
  return([...new Array(100)].map((row,index) => ({
    x: index+1,
    y: serieEscalonada(index+1)
  })));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>N = {N}</h1>
        <XYPlot height={400} width={1000}>
        <HorizontalGridLines />
          <LineSeries data={getData()} />
        </XYPlot>
      </div>
    );
  }
}

export default App;
