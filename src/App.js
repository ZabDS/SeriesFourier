import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines,XAxis,YAxis} from 'react-vis';
//import { Simulate } from 'react-dom/test-utils';

import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

//let N=10;
const series = ['Escalonada','Armonica','Triangular']; //Series definidas

//Serie Escalonada
function serieEscalonada(x,N){
      let n = 1;
      let sum = 0;
      while(n<=N){
        sum += (2 / (n * Math.PI)) * (1-(Math.pow((-1),n))) * Math.sin(n*x);
        n++;
      }
      
      return sum;
}

//Serie Armonica
function serieArmonica(x,N){
  let n = 1;
  let sum = 0;
  while(n<=N){
    sum += ((Math.pow((-1),(n+1))/n) * Math.sin(n*x));
    n++;
  }
  return sum;
}

//Ejemplo de serie 
function serieTriangular(x,N){
      let n = 1;
      let sum = 0;
      while(n<=N){
        sum += ((1/(2*n-1)) * Math.sin((2*n-1)* Math.PI * x) / 3);
        n++;
      }
      return sum;
}

//Selecciona la serie de fourier
function switcher(seriesIndex,x,limit){

  switch (seriesIndex) {
    case 0:
      return serieEscalonada(x,limit);
    case 1:
      return serieArmonica(x,limit);
    case 2: 
      return serieTriangular(x,limit);
    default:
      return serieEscalonada(x,limit);
  }
}

function getData(seriesIndex,limit){
  return([...new Array(50)].map((row,index) => ({
    x: index - 50/2,
    y: switcher(seriesIndex,index+1,limit)
  })));
}

const useStyles = makeStyles({
  root: {
    width: 30,
  },
});

class App extends Component {
  state = {
    data: getData(0,10),
    selectSerie: 0, //Usa este estado para cambiar de una serie a otra.
    varN: 10
  };
  
  render() {
    const handleSliderChange = (event, newValue) => {
      this.setState({varN: newValue});
      this.setState({data: getData(this.state.selectSerie,this.state.varN)});
      //N = newValue;
    };

    const handleTextFiledChange = (event) => {
      this.setState({varN: event.target.value});
      this.setState({data: getData(this.state.selectSerie,this.state.varN)});
      //N = newValue;
    };

    const handleSwitcherChange = (event) => {
      this.setState({selectSerie: event.target.value});
       this.setState({data: getData(this.state.selectSerie,this.state.varN)});
    };

    return (
      <div className="App">
        
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Typography variant="h3">
        Serie de Fourier: {series[this.state.selectSerie]}
        </Typography>
        <center>
        <XYPlot height={300} width={1500} >
          <LineSeries data={this.state.data} animation={'gentle'} getNull={(d) => d.y !== null}/>
          <HorizontalGridLines/>
          <XAxis title="X" style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, fontSize: 10}
            }}/>
            <YAxis title="Y" style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, fontSize: 10}
            }}/> 
        </XYPlot>
        </center>
        </Grid>
        <Grid
          xs={12}
          item
          direction="column"
          justify="space-around"
          alignItems="center"
        >     
        
        <div className={useStyles.root}>
          
        <Slider
          defaultValue={5}
          onChange={handleSliderChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={1}
          max={1000}
        />

        <TextField 
          id="standard-basic"
          label="N value:"           
          onChange={handleTextFiledChange}
          />
        </div>
        <Select labelId="label" 
        id="select"
        onChange={handleSwitcherChange} value={this.state.selectSerie}>
        <MenuItem value={0} >Serie Escalonada</MenuItem>
        <MenuItem value={1}>Serie Armónica</MenuItem>
        <MenuItem value={2}>Serie Triangular</MenuItem>
      </Select>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default App;
