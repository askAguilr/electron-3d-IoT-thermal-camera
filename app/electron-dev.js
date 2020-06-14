const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_DEV_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            const electronProcess = exec('npm run electron').stdout.on("data", (data) => {
                console.log("Electron says:"+data);
            });
            const arduinoProcess = exec('node usb-server').stdout.on("data", (data) => {
                console.log("Arduino says:"+data);
            });
            electronProcess.on("close",()=>process.exit(0));
        }

        
    }
);


tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});