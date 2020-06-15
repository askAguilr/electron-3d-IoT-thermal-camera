//ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  SocketProvider,
  useSocketState
} from 'react-socket-io-hooks';
import foreheadMarker from '../src/assets/forehead-marker.png';
import mouthMarker from '../src/assets/mouth-marker.png';
import facemaskOk from '../src/assets/facemask-ok.png';
import facemaskFail from '../src/assets/facemask-fail.png';
import thermoGreen from '../src/assets/temp-green.png';
import thermoNone from '../src/assets/temp-none.png';
import thermoAmber from '../src/assets/temp-amber.png';
import thermoRed from '../src/assets/temp-red.png';
import SubWindow  from './SubWindow';

const exec = eval('require')('child_process').exec;

const Thermometer = (props:any) => {
  const {color} = props;
  const renders = {
    NONE:()=><img src={thermoNone} alt='' style={{
      width:280,
      height:'auto',
      position:'absolute',
      left:1324,
      top:0,
    }}/>,
    GREEN:()=><img src={thermoGreen} alt='' style={{
      width:280,
      height:'auto',
      position:'absolute',
      left:1324,
      top:0,
    }}/>,
    AMBER:()=><img src={thermoAmber} alt='' style={{
      width:280,
      height:'auto',
      position:'absolute',
      left:1324,
      top:0,
    }}/>,
    RED:()=><img src={thermoRed} alt='' style={{
      width:280,
      height:'auto',
      position:'absolute',
      left:1324,
      top:0,
    }}/>,

  }
  //ts-ignore
  const ret = renders[color]?renders[color]():renders['NONE']();
  return(ret);
}

const Mask = (props:any) => {
  const {mask} = props;
  return <img src={mask?facemaskOk:facemaskFail} alt='' style={{
    width:550,
    height:'auto',
    position:'absolute',
    left:-600,
    top:0,
  }}/>
}


function App() {
  useEffect( () => {
    console.log(navigator);
    //exec("npx nodemon usb-server");
    //@ts-ignore
    window.ipcRenderer?.on('ELECTRON_READY', () => { 
            console.log("electron is ready") 
        });       
  }, []);

  const [isOpen,setOpen] = useState(false);
  const [color,setColor] = useState('white');
  const reducer = (state:any, action:any) => {
    console.log(action)
    if(action?.payload){
      setColor(action.payload.color);
    }
    return state;
  };
  //ts-ignore
  return (    <SocketProvider reducer={reducer}
    uri="http://localhost:555"
    initialState={{color:'NONE'}}> 
      <div className="App">
        <img src={foreheadMarker} alt='' style={{
          width:800,
          height:'auto',
          position:'absolute',
          left:500,
          top:-300,
        }}/>
        <Thermometer color={color}/>
        <Mask mask={true}/>
        <img src={mouthMarker} alt='' style={{
          width:800,
          height:'auto',
          position:'absolute',
          left:-200,
          top:600,
        }}/>          
      </div>
      </SocketProvider>
  );
}

export default App;
