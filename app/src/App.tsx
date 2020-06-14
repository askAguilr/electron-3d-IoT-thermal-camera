//ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  SocketProvider,
  useSocketState
} from 'react-socket-io-hooks';
import SubWindow  from './SubWindow';

const exec = eval('require')('child_process').exec;

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
        <div style={{
          position: 'absolute',
          right: 100,
          top: 200
        }}>
            <span className="thermometer"></span>
        </div>
          
      </div>
      </SocketProvider>
  );
}

export default App;
