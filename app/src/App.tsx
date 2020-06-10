import React, { useEffect, useState } from 'react';
import SubWindow  from './SubWindow';

const exec = eval('require')('child_process').exec;

function App() {
  useEffect( () => {
    console.log(navigator);
   // exec("node usb-server")
    //@ts-ignore
    window.ipcRenderer?.on('ELECTRON_READY', () => { 
            console.log("electron is ready") 
        });       
  }, []);

  const [isOpen,setOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input type="checkbox" checked={isOpen} onChange={()=>setOpen(!isOpen)} />
        {isOpen&&
          <SubWindow onClose={()=>setOpen(false)} title="subwindow">
            <div>You can put anything here!</div>
          </SubWindow>
        }
      </header>
    </div>
  );
}

export default App;
