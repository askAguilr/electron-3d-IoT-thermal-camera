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
  const reducer = (state, action) => {
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
        <header className="App-header">
          <p style={{backgroundColor:color}}>
             <span className="thermometer">80&deg;C</span>
          </p>
          <input type="checkbox" checked={isOpen} onChange={()=>setOpen(!isOpen)} />
          {isOpen&&
            <SubWindow onClose={()=>setOpen(false)} title="subwindow">
              <div>You can put anything here!</div>
            </SubWindow>
          }
        </header>
      </div>
      </SocketProvider>
  );
}

export default App;
