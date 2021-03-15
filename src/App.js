import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines,XAxis,YAxis} from 'react-vis';

let N=200000;

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
  return([...new Array(50)].map((row,index) => ({
    x: index - 50/2,
    y: serieEscalonada(index+1)
  })));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>N = {N}</h1>
        <XYPlot height={200} width={1000}>
          <LineSeries data={getData()} />
          <HorizontalGridLines/>
          <XAxis title="X" style={{
            line: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}/>
            <YAxis title="Y" style={{
            line: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}/>

        </XYPlot>
      </div>
    );
  }
}

export default App;
